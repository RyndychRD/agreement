//Доступ в БД
const { default: knex } = require("knex");
const knexConfig = require("../../../db/knexfile");

class DocumentSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Собирает информацию, которая привязана непосредственно к документу в таблице documents
   * @param {*} query
   * @returns
   */
  addForeignTablesInformation(query) {
    //Подтягиваем статусы документа
    query = query
      .select("document_statuses.name as document_status_name")
      .leftJoin(
        "document_statuses",
        "documents.document_status_id",
        "document_statuses.id"
      );
    //подтягиваем тип документа
    query = query
      .select("document_types.name as document_type_name")
      .leftJoin(
        "document_types",
        "documents.document_type_id",
        "document_types.id"
      );
    //подтягиваем текущего подписанта/подписантов
    query = query
      .select("currentSigner.signer_id as current_signer_id")
      .select("currentSigner.deputy_signer_id as current_deputy_signer_id")
      .leftJoin(
        this.knexProvider.raw(
          '"documents-signers_route" AS "currentSigner" ON "documents"."id"' +
            ' = "currentSigner"."document_id" AND "documents"."last_signed_step"+1' +
            ' = "currentSigner"."step"'
        )
      );
    return query;
  }
  /**
   * Собирает информацию по внутреннему наполнению документа(document_values, document_files ...)
   * @param {*} query
   * @returns
   */
  addDocumentData(query) {
    return query;
  }

  /**
   * Фильтрует по подписанию документов в таблице documents-signers_route и возвращает только те, которые подписал этот пользователь
   * @param {*} query
   * @returns
   */
  addOnlyMySignedDocuments(query, currentUser) {
    query = query.where(
      this.knexProvider.raw(
        `"documents"."id" IN
         (SELECT 
            "documents-signers_route"."document_id" 
          FROM 
            "documents-signers_route" 
          WHERE 
            "documents-signers_route".actual_signer_id='${currentUser}' 
          )`
      )
    );
    return query;
  }
  /**
   * Фильтрует по подписанию документов в таблице documents-signers_route и возвращает только те, которые должен подписать этот пользователь
   * @param {*} query
   * @returns
   */
  addOnlyForSigningDocuments(query, currentUser) {
    query = query
      .leftJoin(
        "documents-signers_route",
        "documents.id",
        "documents-signers_route.document_id"
      )
      .whereRaw('documents.last_signed_step+1="documents-signers_route".step')
      .where(function () {
        this.where({
          "documents-signers_route.signer_id": currentUser,
        }).orWhere({
          "documents-signers_route.deputy_signer_id": currentUser,
        });
      });
    return query;
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   * @param {boolean} isAddForeignTables - Добавить разыменование метаданных документа?
   * @param {boolean} isAddDocumentData - Добавить разыменование данных документа, введенных пользователем?
   */
  async findOne({ filter, isAddForeignTables, isAddDocumentData }) {
    let query = this.knexProvider("documents")
      .first("documents.*")
      .orderBy("documents.id", "asc");

    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    if (isAddDocumentData) query = this.addDocumentData(query);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   * @param {boolean} isAddForeignTables - Добавить разыменование метаданных документа?
   * @param {boolean} isAddDocumentData - Добавить разыменование данных документа, введенных пользователем?
   */
  async find({
    filter,
    isAddForeignTables,
    isAddDocumentData,
    isOnlyMySignedDocuments,
    isOnlyForSigningDocuments,
    currentUser,
  }) {
    let query = this.knexProvider("documents")
      .select("documents.*")
      .orderBy("documents.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    if (isAddDocumentData) query = this.addDocumentData(query);
    if (isOnlyMySignedDocuments)
      query = this.addOnlyMySignedDocuments(query, currentUser);
    if (isOnlyForSigningDocuments)
      query = this.addOnlyForSigningDocuments(query, currentUser);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} document
   * @returns
   */
  async create(document) {
    return await this.knexProvider("documents").insert(document).returning("*");
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("documents").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, document) {
    return await this.knexProvider("documents").where(filter).update(document);
  }

  async changeLastSignedStep({ documentId, isIncrement }) {
    let query = this.knexProvider("documents")
      .increment("last_signed_step")
      .where({ id: documentId })
      .update({ updated_at: "now" })
      .returning("*");
    query = isIncrement
      ? query.increment("last_signed_step")
      : query.decrement("last_signed_step");

    const result = await query;

    //Мы всегда будем получать результат как массив из 1 элемента, так как мы обновляем конкретный документ
    return result[0];
  }
}

module.exports = new DocumentSchema();
