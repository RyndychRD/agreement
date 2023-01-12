import { AUseForm } from "../../../../../adapter";
import ModalInput from "../../../../../fragments/modals/modalInput";
import CreateUpdateForm from "./createUpdateForm";
import { useAddPositionMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";

/**
 * @return Модальное окно для создания новой должности
 */
export default function CreateButtonModel() {
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  return (
    <ModalInput
      addMutation={useAddPositionMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
    />
  );
}
