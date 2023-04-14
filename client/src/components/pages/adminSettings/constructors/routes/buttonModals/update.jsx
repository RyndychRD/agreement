import { Form } from "antd";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import {
  useGetRouteQueryHook,
  useUpdateRouteMutationHook,
} from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = Form.useForm();

  const formDefaultValues = (data) => ({
    // Да, эта штука просто хардкодит значение в селект боксе и переиспользовать его не получится
    typeId: data?.document_type_name,
    routeSteps: data?.route,
  });

  return (
    <ModalUpdate
      getQuery={useGetRouteQueryHook}
      updateMutation={useUpdateRouteMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
