import { AUseForm } from "../../../../../adapter";
import { ModalInput } from "../../../../../fragments/modals/modals";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import { useAddPositionMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import CreateUpdateForm from "./createUpdateForm";

/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  const [addPosition, { isError, isLoading, reset }] = useAddPositionMutation();

  /**
   * При создании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await addPosition(values).unwrap();
        form.resetFields();
        if (!isError) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания должности:", info);
      });
  };

  return (
    <ModalInput
      isError={isError}
      isLoading={isLoading}
      open={state.isShowCreateModal}
      onOk={onFinish}
      onCancel={() => {
        reset();
        form.resetFields();
        dispatch({ type: "closeAllModal" });
      }}
    >
      {state.isShowCreateModal ? <CreateUpdateForm form={form} /> : ""}
    </ModalInput>
  );
}
