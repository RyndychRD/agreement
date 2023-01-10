import {
  useGetRightQueryHook,
  useUpdateRightMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newRightName: data?.name,
    newRightCodeName: data?.code_name,
  });
  return (
    <ModalUpdate
      getQuery={useGetRightQueryHook}
      updateMutation={useUpdateRightMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
