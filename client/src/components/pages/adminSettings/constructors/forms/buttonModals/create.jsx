import { AUseForm } from "../../../../../adapter";
import CreateUpdateForm from "./createUpdateForm";
import ModalInput from "../../../../../fragments/modals/modalInput";
import { useAddDocumentTypeViewHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddDocumentTypeViewHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
