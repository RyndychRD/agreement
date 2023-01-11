import {
  useGetTypeQueryHook,
  useUpdateTypeMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newTypeName: data?.name,
  });
  return (
    <ModalUpdate
      getQuery={useGetTypeQueryHook}
      updateMutation={useUpdateTypeMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
