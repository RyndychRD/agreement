const UserModels = require("../models/user-models");
const MailService = require("./mail-service");
const TokenService = require("./token-service");
const UserDTO = require("../dtos/user-dtos");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dtos");
// const ApiError = require("../exceptions/api-error");

class UserService {
  /**
   * Регистрация пользователя в системе
   * @param {*} email
   * @param {*} password
   */
  async registration(email, password) {
    //Поиск в базе данных, есть ли пользователь с таким Email'ом.
    const candidate = await UserModels.findOne({ email: email });
    //Если такой существует  в̶о̶з̶б̶у̶ж̶д̶а̶е̶м̶с̶я̶ ̶и̶   отсылаем ответ что то тут не так !
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким email'ом:${email} существует !`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModels.create({
      login: email,
      email: email,
      last_name: email[1],
      first_name: email[0],
      is_active: true,
      password: hashPassword,
      // is_active: false,
      activation_link: activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const object_userDTO = new UserDTO(user); // id, email, isActivated
    const tokens = TokenService.generateTokens({ ...object_userDTO });
    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);

    return { ...tokens, user: object_userDTO };
  }

  /**
   * Активация по ссылки пользователя
   * @param {*} activationLink
   */
  async activate(activationLink) {
    const user = await UserModels.findOne({ activation_link: activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    await UserModels.update({ id: user.id }, { ...user, is_active: true });
  }

  /**
   * Операция авторизации
   * @param {*} login
   * @param {*} password
   * @returns
   */
  async login(login, password) {
    //Ищем пользователя
    const user = await UserModels.findOne({ login: login });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким login'ом не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const object_userDTO = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...object_userDTO });

    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);
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
    console.log("console.log(refreshToken)", refreshToken);
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    console.log("console.log(userData)", userData);
    const tokenFromDb = await TokenService.findToken({
      refresh_token: refreshToken,
    });
    console.log("console.log(tokenFromDb)", tokenFromDb);
    console.log(
      "console.log(!userData || !tokenFromDb)",
      !userData || !tokenFromDb
    );
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModels.findOne({ id: userData.id });
    const object_userDTO = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...object_userDTO });

    await TokenService.saveToken(object_userDTO.id, tokens.refreshToken);
    return { ...tokens, user: object_userDTO };
  }

  /**
   * Взять всех пользователей
   * @returns
   */
  async getAllUsers() {
    const users = await UserModels.find();
    return users;
  }
}

module.exports = new UserService();
