/** @format */

import { AModal } from "../../adapter";
import SimpleError from "../spinners/Error";
import SimpleSpinner from "../spinners/Spinner";

export function ModalInput({
  isOpen,
  dispatch,
  form,
  addMutation,
  CreateUpdateForm,
}) {
  const [addFunc, { isError, isLoading, reset }] = addMutation();
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
      {!isLoading && !isError ? children : ""}
    </AModal>
  );
}

export function ModalUpdate(props) {
  const { children, isLoading, isError } = props;
  return (
    <AModal okText="Редактировать" cancelText="Отмена" {...props}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? children : ""}
    </AModal>
  );
}
export function ModalDelete(props) {
  const { children, isLoading, isError } = props;
  return (
    <AModal okText="Удалить" cancelText="Отмена" {...props}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? (
        <>
          Вы уверены что хотите удалить элемент?
          <br /> {children}
        </>
      ) : (
        ""
      )}
    </AModal>
  );
}
