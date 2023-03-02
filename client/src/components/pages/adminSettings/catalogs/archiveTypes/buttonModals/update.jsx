import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import {
  useGetArchiveTypeQueryHook,
  useUpdateArchiveTypeMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newArchiveTypeName: data?.name,
  });
  return (
    <ModalUpdate
      getQuery={useGetArchiveTypeQueryHook}
      updateMutation={useUpdateArchiveTypeMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
