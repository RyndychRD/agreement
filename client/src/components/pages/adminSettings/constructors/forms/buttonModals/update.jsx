import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import {
  useGetDocumentTypeViewHook,
  useUpdateDocumentTypeViewHook,
} from "../../../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();

  const formDefaultValues = (data) => ({
    // Да, эта штука просто хардкодит значение в селект боксе и переиспользовать его не получится
    typeId: data?.document_type_name,
    elementsOrder: data?.view?.elements_order,
  });

  return (
    <ModalUpdate
      getQuery={useGetDocumentTypeViewHook}
      updateMutation={useUpdateDocumentTypeViewHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
