/**
 * Объект для передачи данных пользователя (Data-transfer-object)
 */
class DepartmentDto {
  id;
  name;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
  }
}

module.exports = DepartmentDto;
