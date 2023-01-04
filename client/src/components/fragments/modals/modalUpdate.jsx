/** @format */
import { useEffect } from "react";
import { AModal } from "../../adapter";
import SimpleError from "../spinners/Error";
import SimpleSpinner from "../spinners/Spinner";
import { useCustomDispatch, useCustomState } from "../tables/Provider";

export default function ModalUpdate({
  getQuery,
  updateMutation,
  form,
  CreateUpdateForm,
  formDefaultValues,
  preFinishFunc = null,
}) {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const isOpen = state.isShowUpdateModal && state.currentRow;

  const [
    updateFunc,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = updateMutation();

  const {
    data = {},
    isLoading: isLoadingGet,
    isError: isErrorGet,
  } = getQuery({
    currentRow: state?.currentRow,
    isStart: state.isShowUpdateModal,
    isAddRights: true,
  });

  /**
   * При редактировании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = preFinishFunc ? preFinishFunc(values) : values;
        await updateFunc({
          ...preparedValues,
          currentRow: state.currentRow,
        }).unwrap();
        if (!isErrorUpdate) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания департамента:", info);
      });
  };

  /**
   * Очищаем форму, достаем нужную строку из хранилища редакса по переданному ID
   * Заполняем форму полученными данными
   */
  useEffect(
    () => {
      if (!isErrorUpdate) {
        form.resetFields();
        form.setFieldsValue(formDefaultValues(data));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isShowUpdateModal, data]
  );

  const isLoading = isLoadingGet || isLoadingUpdate;
  const isError = isErrorGet || isErrorUpdate;
  return (
    <AModal
      okText="Редактировать"
      cancelText="Отмена"
      onOk={onFinish}
      open={isOpen}
      onCancel={() => {
        resetUpdate();
        dispatch({ type: "closeAllModal" });
      }}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? (
        <CreateUpdateForm form={form} isAddDisabledField />
      ) : (
        ""
      )}
    </AModal>
  );
}
