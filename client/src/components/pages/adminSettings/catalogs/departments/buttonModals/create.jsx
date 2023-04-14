import { Form } from "antd";
import ModalInput from "../../../../../fragments/modals/modalInput";

import { useAddDepartmentMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";
import CreateUpdateForm from "./createUpdateForm";
/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = Form.useForm();
  return (
    <ModalInput
      addMutation={useAddDepartmentMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
