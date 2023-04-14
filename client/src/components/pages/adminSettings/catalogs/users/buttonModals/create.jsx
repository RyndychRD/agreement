import { Form } from "antd";
import ModalInput from "../../../../../fragments/modals/modalInput";
import { useAddUserMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/UserApi";
import CreateUpdateForm from "./createUpdateForm";

/**
 * @return Модальное окно для создания нового пользователя
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = Form.useForm();
  return (
    <ModalInput
      addMutation={useAddUserMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
