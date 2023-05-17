import { renderDate } from "../../../components/fragments/tables/CommonFunctions";
import { api } from "../../../http/index";
import { userNameMask } from "../../CommonFunctions";

export default class DocumentValuesService {
  static API_ROUTE = "/documents/values";

  /**
   * Предобработка данных по values из документа
   * @param {*} dataStep
   * @returns
   */
  static getValueAndLabelFromDocumentValue(dataStep) {
    // В данных не должна отображаться информация по регистрации документа, даже если она заполнена(требование Михеевой)
    if (
      [
        "contractSumNoNDS",
        "currentNDS",
        "fullNameOfTheItemInBudget",
        "contractSumWithNDS",
      ].includes(dataStep.key)
    )
      return undefined;
    switch (dataStep?.data_type) {
      case "text":
      case "number":
      case "phone":
      case "select_id":
      case "email":
        return {
          value: dataStep?.value,
          label: dataStep.label,
        };
      case "datePicker":
        return {
          value: renderDate(dataStep?.value, false),
          label: dataStep.label,
        };
      case "table":
        if (dataStep?.select_value.table === "users")
          return {
            value: userNameMask(dataStep?.value),
            label: dataStep.label,
          };
        return { value: dataStep?.value?.name, label: dataStep.label };
      default:
        return {
          value: `Не найден фрагмент для отображения ${dataStep?.data_type}`,
          label: "ОШИБКА",
          className: "danger",
        };
    }
  }

  static async getOneDocumentValues(props) {
    const { documentId, isGetConnectedTables } = props;
    console.log(
      `вызов в DocumentValuesService -> Взять значения по одному документу c ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}?documentId=${documentId}&isGetConnectedTables=${isGetConnectedTables}`
    );
    console.log(
      "вызов в DocumentValuesService -> Взять значения по одному документу -> результат",
      response
    );
    return response.data;
  }
}
