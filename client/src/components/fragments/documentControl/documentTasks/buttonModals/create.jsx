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
  form.setFieldValue("documentId", documentId);

  return (
    <ModalInput
      addMutation={useAddDocumentTaskMutationHook}
      form={form}
      CreateUpdateForm={CreateForm}
      customState={useInnerTableState}
      customDispatch={useInnerTableDispatch}
    />
  );
}
