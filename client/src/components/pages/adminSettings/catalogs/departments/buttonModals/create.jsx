import { AForm, AUseForm } from "../../../../../adapter";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import { ModalInput } from "../../../../../fragments/modals/modals";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import { useAddDepartmentMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";

/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  /** Служит для отслеживания формы из модального окна для обработки по кнопке */
  const [form] = AUseForm();
  const [addProduct, { isError, isLoading, reset }] =
    useAddDepartmentMutation();

  /**
   * При создании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await addProduct(values).unwrap();
        form.resetFields();
        if (!isError) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка валидации на форме создания департамента:", info);
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
      {state.isShowCreateModal ? (
        <AForm form={form}>
          <TextInputFormItem
            title="Наименование департамента"
            name="newDepartmentName"
            rules={[
              {
                required: true,
                message: "Введите название департамента",
              },
            ]}
          />
        </AForm>
      ) : (
        ""
      )}
    </ModalInput>
  );
}
