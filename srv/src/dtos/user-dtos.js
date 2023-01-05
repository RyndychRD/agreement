/**
 * Объект для передачи данных пользователя (Data-transfer-object)
 */
class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.id = model.id;
    this.login = model.login;
    this.email = model.email;
    this.first_name = model.first_name;
    this.middle_name = model.middle_name;
    this.last_name = model.last_name;
    this.position_id = model.position_id;
    this.is_disabled = model.is_disabled;
    //Все права, которые есть у пользователя, собираются в один массив
    this.rights = model?.rights
      ?.concat(model?.rights_inherited_department)
      ?.concat(model?.rights_inherited_position);
  }
}

module.exports = UserDto;
