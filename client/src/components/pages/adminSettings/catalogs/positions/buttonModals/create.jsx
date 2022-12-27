import { AUseForm } from "../../../../../adapter";
import ModalInput from "../../../../../fragments/modals/modalInput";
import { useAddPositionMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import CreateUpdateForm from "./createUpdateForm";

/**
 * @return Модальное окно для создания новой должности
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddPositionMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
