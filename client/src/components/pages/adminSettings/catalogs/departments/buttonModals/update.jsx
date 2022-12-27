import {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newDepartmentName: data?.name,
    rightIds: data?.rights?.map((el) => el.id),
  });
  return (
    <ModalUpdate
      getQuery={useGetDepartmentQuery}
      updateMutation={useUpdateDepartmentMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
