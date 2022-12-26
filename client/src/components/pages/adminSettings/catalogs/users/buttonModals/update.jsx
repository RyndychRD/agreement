import { useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/UserApi";
import { AUseForm } from "../../../../../adapter";
import { ModalUpdate } from "../../../../../fragments/modals/modals";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import CreateUpdateForm from "./createUpdateForm";

const PASSWORD_PLACEHOLDER = "*********";

const isPasswordSame = (pass) => pass === PASSWORD_PLACEHOLDER;

export default function UpdateButtonModel() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();

  const isAddDisabledField = true;

  const [
    updateUser,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useUpdateUserMutation();

  const {
    data: user = {},
    isLoading: isLoadingGet,
    isError: isErrorGet,
  } = useGetUserQuery({
    id: state?.currentRow?.user_id,
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
        const valuesPassCheck = values;
        if (isPasswordSame(valuesPassCheck.newPassword)) {
          delete valuesPassCheck.newPassword;
        }
        await updateUser({
          ...valuesPassCheck,
          user_id: state.currentRow?.user_id,
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
          newLogin: user?.login,
          newEmail: user?.email,
          newPassword: PASSWORD_PLACEHOLDER,
          newFirstName: user?.first_name,
          newLastName: user?.last_name,
          newMiddleName: user?.middle_name,
          positionId: user?.position_id,
          isDisabled: user?.is_disabled,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isShowUpdateModal, user?.login]
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
      {state.isShowUpdateModal ? (
        <CreateUpdateForm form={form} isAddDisabledField={isAddDisabledField} />
      ) : (
        ""
      )}
    </ModalUpdate>
  );
}
