import { Form } from "antd";

import CreateForm from "./createForm";
import ModalInput from "../../../modals/modalInput";
import { useAddDocumentTaskMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import {
  useDocumentTasksInnerTableDispatch,
  useDocumentTasksInnerTableState,
} from "../../../tables/DocumentTasksInnerTableProvider";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel({
  documentId,
  afterFinishFunc = () => {},
  confirmOnOkContent,
}) {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = Form.useForm();
  const state = useDocumentTasksInnerTableState();
  switch (state.modalTypeId) {
    case 2:
      form.setFieldValue(
        "problem",
        "Собрать информацию для заполнения 2 раздела"
      );
      break;
    case 3:
      form.setFieldValue(
        "problem",
        "Собрать информацию для регистрации договора"
      );
      break;
    default:
      form.setFieldValue("problem", "");
      break;
  }

  form.setFieldValue("typeId", state.modalTypeId ? state.modalTypeId : 1);
  form.setFieldValue("documentId", documentId);

  return (
    <ModalInput
      addMutation={useAddDocumentTaskMutationHook}
      form={form}
      CreateUpdateForm={CreateForm}
      customState={useDocumentTasksInnerTableState}
      customDispatch={useDocumentTasksInnerTableDispatch}
      CreateUpdateFormProps={{ documentId }}
      confirmOnOkContent={confirmOnOkContent}
      afterFinishFunc={afterFinishFunc}
    />
  );
}
