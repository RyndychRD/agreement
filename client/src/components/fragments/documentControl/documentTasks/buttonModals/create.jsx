import { Form } from "antd";

import CreateForm from "./createForm";
import ModalInput from "../../../modals/modalInput";
import { useAddDocumentTaskMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import {
  useInnerTableDispatch,
  useInnerTableState,
} from "../../../tables/InnerTableProvider";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel({ documentId }) {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = Form.useForm();
  const state = useInnerTableState();
  if (state.modalTypeId === 2) {
    form.setFieldValue(
      "problem",
      "Собрать информацию для заполнения 2 раздела"
    );
  } else {
    form.setFieldValue("problem", "");
  }
  form.setFieldValue("typeId", state.modalTypeId ? state.modalTypeId : 1);
  form.setFieldValue("documentId", documentId);

  return (
    <ModalInput
      addMutation={useAddDocumentTaskMutationHook}
      form={form}
      CreateUpdateForm={CreateForm}
      customState={useInnerTableState}
      customDispatch={useInnerTableDispatch}
      CreateUpdateFormProps={{ documentId }}
    />
  );
}
