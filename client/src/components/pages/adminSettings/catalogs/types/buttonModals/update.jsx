import { Form } from "antd";
import {
  useGetTypeQueryHook,
  useUpdateTypeMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = Form.useForm();
  const formDefaultValues = (data) => ({
    newTypeName: data?.name,
    isRouteConstructAvailable: data?.is_route_construct_available,
    isFormConstructAvailable: data?.is_form_construct_available,
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
