//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class FilesSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  async createOneFile({ file }) {
    const response = await this.knexProvider("files")
      .insert(file)
      .returning("id");
    return response;
  }

  async findOne(fileId) {
    const response = await this.knexProvider("files")
      .first("*")
      .where({ id: fileId });
    return response;
  }
  async update({ file }) {
    const response = await this.knexProvider("files")
      .where({ id: file.id })
      .update(file);
    return response;
  }
  async delete(filter) {
    const response = await this.knexProvider("files").where(filter).delete();
    return response;
  }
}

module.exports = new FilesSchema();
