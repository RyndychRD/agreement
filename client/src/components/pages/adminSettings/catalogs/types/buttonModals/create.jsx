import { AUseForm } from "../../../../../adapter";
import ModalInput from "../../../../../fragments/modals/modalInput";

import { useAddTypeMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import CreateUpdateForm from "./createUpdateForm";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddTypeMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}