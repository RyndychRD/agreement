import { Form } from "antd";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import UpdateForm from "./updateForm";
import {
  useGetDocumentTaskQueryHook,
  useCompleteDocumentTaskMutationHook,
} from "../../../../../../core/redux/api/DocumentControl/DocumentTaskApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = Form.useForm();

  // Пока что ничего не делает, осталось тут скорее как пример и закладка
  const formDefaultValues = (data) => ({
    result: data.result,
    currentNDS: 12,
  });

  return (
    <ModalUpdate
      getQuery={useGetDocumentTaskQueryHook}
      updateMutation={useCompleteDocumentTaskMutationHook}
      form={form}
      CreateUpdateForm={UpdateForm}
      formDefaultValues={formDefaultValues}
      isAddForeignTables
      isAddDocumentValues
      additionalGetQueryProps={{
        isAddDocumentValues: true,
        isAddDocumentFiles: true,
      }}
      notificationType="IncomeTask"
    />
  );
}
