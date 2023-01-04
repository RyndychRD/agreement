import {
  useGetRightQuery,
  useUpdateRightMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/RightApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({ newRightName: data?.name });
  return (
    <ModalUpdate
      getQuery={useGetRightQuery}
      updateMutation={useUpdateRightMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
