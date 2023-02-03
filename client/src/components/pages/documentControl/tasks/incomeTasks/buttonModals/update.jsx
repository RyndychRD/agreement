import { Form } from "antd";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import updateForm from "./updateForm";
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
  });
  return (
    <ModalUpdate
      getQuery={useGetDocumentTaskQueryHook}
      updateMutation={useCompleteDocumentTaskMutationHook}
      form={form}
      CreateUpdateForm={updateForm}
      formDefaultValues={formDefaultValues}
      isAddForeignTables
    />
  );
}
