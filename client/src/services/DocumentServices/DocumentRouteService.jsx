// import { api } from "../../http/index";

export default class DocumentRouteService {
  static API_ROUTE = "/catalog/documents";

  /**
   * Подразумевается что мы получаем список пользователей, которые должны подписать документ
   * Здесь мы должны заполнить таблицу documents-signers_route для документа
   * @param {*} usersToSign - Массив списка пользователей для подписания
   * @param {*} documentId - id документа, для которого генерируем подписание
   */
  static submitDocumentRoute(props) {
    const { usersToSign, documentId } = props;
    console.log("document_id", documentId);
    console.log("usersToSign", usersToSign);
  }
}
