import { Form } from "antd";
import { useAddTypeMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import CreateUpdateForm from "./createUpdateForm";
import ModalInput from "../../../../../fragments/modals/modalInput";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = Form.useForm();
  return (
    <ModalInput
      addMutation={useAddTypeMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
