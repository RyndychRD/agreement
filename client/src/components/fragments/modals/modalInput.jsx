import { AModal } from "../../adapter";
import SimpleError from "../spinners/Error";
import SimpleSpinner from "../spinners/Spinner";
import { useCustomState, useCustomDispatch } from "../tables/Provider";

export default function ModalInput({ form, addMutation, CreateUpdateForm }) {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const [addFunc, { isError, isLoading, reset }] = addMutation();
  const isOpen = state.isShowCreateModal;

  const children = isOpen ? <CreateUpdateForm form={form} /> : "";
  /**
   * При создании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await addFunc(values).unwrap();
        form.resetFields();
        if (!isError) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания департамента:", info);
      });
  };
  return (
    <AModal
      okText="Сохранить"
      cancelText="Отмена"
      destroyOnClose
      onOk={onFinish}
      onCancel={() => {
        reset();
        form.resetFields();
        dispatch({ type: "closeAllModal" });
      }}
      open={isOpen}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? children : ""}
    </AModal>
  );
}
