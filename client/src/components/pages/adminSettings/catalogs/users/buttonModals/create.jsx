import { AUseForm } from "../../../../../adapter";
import ModalInput from "../../../../../fragments/modals/modalInput";
import { useAddUserMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/UserApi";
import CreateUpdateForm from "./createUpdateForm";

/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddUserMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}