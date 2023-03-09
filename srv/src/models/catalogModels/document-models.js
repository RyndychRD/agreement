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
    //подтягиваем данные по митворгу
    query = query
      .select("document_mitvorg.number as document_mitvorg_number")
      .select(
        "document_mitvorg.registration_date as document_mitvorg_registration_date"
      )
      .leftJoin(
        "document_mitvorg",
        "documents.id",
        "document_mitvorg.document_id"
      );
    // Подтягиваем данные по архиву для документа
    query = query
      .leftJoin(
        "document_archives",
        "documents.id",
        "document_archives.document_id"
      )
      .leftJoin(
        "archive_types",
        "document_archives.archive_type_id",
        "archive_types.id"
      )
      .select("document_archives.archive_type_id as document_archive_type_id")
      .select("document_archives.passed_at as document_passed_to_archive_at")
      .select("archive_types.name as document_archive_type_name");
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
   */
  async findOne({ filter, isAddForeignTables }) {
    let query = this.knexProvider("documents")
      .first("documents.*")
      .orderBy("documents.id", "asc");

    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   * @param {boolean} isAddForeignTables - Добавить разыменование метаданных документа?
   */
  async find({
    filter,
    isAddForeignTables,
    isOnlyMySignedDocuments,
    isOnlyForSigningDocuments,
    currentUser,
  }) {
    let query = this.knexProvider("documents")
      .select("documents.*")
      .orderBy("documents.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
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
