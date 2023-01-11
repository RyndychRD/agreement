import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import getUniqNotNullIds from "../../../../../../services/CommonFunctions";
import {
  useGetRoutesQueryHook,
  useUpdateRouteMutationHook,
} from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newDepartmentName: data?.name,
    rightIds: getUniqNotNullIds(data?.rights),
  });
  return (
    <ModalUpdate
      getQuery={useGetRoutesQueryHook}
      updateMutation={useUpdateRouteMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
