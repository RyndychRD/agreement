import { useEffect } from "react";
import {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";
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
    updateDepartment,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useUpdateDepartmentMutation();

  const {
    data = {},
    isLoading: isLoadingGet,
    isError: isErrorGet,
  } = useGetDepartmentQuery({
    id: state?.currentRow?.department_id,
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
        await updateDepartment({
          ...values,
          department_id: state.currentRow?.department_id,
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
  useEffect(() => {
    if (!isErrorUpdate) {
      form.resetFields();
      form.setFieldsValue({
        newDepartmentName: data?.name,
      });
    }
  }, [state.isShowUpdateModal, data?.name]);

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
