import { Form } from "antd";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import { useUpdateArchiveTypeMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";
import { useGetArchiveLogQueryHook } from "../../../../../../core/redux/api/AdminSettings/Logs/ArchiveLogApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = Form.useForm();
  const formDefaultValues = () => ({});
  return (
    <ModalUpdate
      getQuery={useGetArchiveLogQueryHook}
      updateMutation={useUpdateArchiveTypeMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
