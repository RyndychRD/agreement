import { AUseForm } from "../../../../../adapter";
import CreateUpdateForm from "./createUpdateForm";
import { useAddRouteMutationHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import ModalInput from "../../../../../fragments/modals/modalInput";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddRouteMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
