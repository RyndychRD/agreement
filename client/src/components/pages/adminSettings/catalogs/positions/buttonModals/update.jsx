import { useEffect } from "react";
import {
  useGetPositionQuery,
  useUpdatePositionMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import { AUseForm } from "../../../../../adapter";
import { ModalUpdate } from "../../../../../fragments/modals/modals";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();

  const [
    updatePosition,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useUpdatePositionMutation();

  const {
    data: position = {},
    isLoading: isLoadingGet,
    isError: isErrorGet,
  } = useGetPositionQuery({
    id: state?.currentRow?.position_id,
    isStart: state.isShowUpdateModal,
  });

  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();

  /**
   * При редактировании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await updatePosition({
          ...values,
          position_id: state.currentRow?.position_id,
        }).unwrap();
        if (!isErrorUpdate) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка валидации на форме создания департамента:", info);
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
        form.setFieldsValue({
          newPositionName: position?.name,
          departmentId: position?.department_id,
          isSigner: position?.is_signer,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isShowUpdateModal, position?.name]
  );

  return (
    <ModalUpdate
      open={state.isShowUpdateModal && state.currentRow}
      onOk={onFinish}
      onCancel={() => {
        resetUpdate();
        dispatch({ type: "closeAllModal" });
      }}
      isLoading={isLoadingGet || isLoadingUpdate}
      isError={isErrorGet || isErrorUpdate}
    >
      {state.isShowUpdateModal ? <CreateUpdateForm form={form} /> : ""}
    </ModalUpdate>
  );
}
