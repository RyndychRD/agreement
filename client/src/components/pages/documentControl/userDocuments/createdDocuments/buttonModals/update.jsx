import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import {
  useGetRouteQueryHook,
  useUpdateRouteMutationHook,
} from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();

  const formDefaultValues = (data) => ({
    typeId: data?.document_type_name,
    routeSteps: data?.route,
  });

  return (
    <ModalUpdate
      getQuery={useGetRouteQueryHook}
      updateMutation={useUpdateRouteMutationHook}
      form={form}
      formDefaultValues={formDefaultValues}
    />
  );
}
