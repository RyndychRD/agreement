import { api } from "../../../../http/index";

export default class DocumentIODictionaryElementService {
  static API_ROUTE = "/constructor/forms/types-io-elements";

  /**
   * Взять все записи
   * @returns
   */
  static async getAll() {
    console.log(
      "вызов в DocumentIODictionaryElementService -> Взять все записи"
    );
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в DocumentIODictionaryElementService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  /**
   * Взять одну запись
   * @param {*} props.id
   * @returns
   */
  static async getOne(props) {
    const { id } = props;
    console.log(
      "вызов в DocumentIODictionaryElementService -> Взять одну запись"
    );
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в DocumentIODictionaryElementService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
