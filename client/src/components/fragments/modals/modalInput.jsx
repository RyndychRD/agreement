import { Modal } from "antd";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import { onCancelConfirm, onOkConfirm } from "../tables/CommonFunctions";
import {
  useTableModalsState,
  useTableModalDispatch,
} from "../tables/TableModalProvider";

/**
 * Общее окно для отображения модального окна добавления чего либо.
 * При сабмите вызывает функцию для добавления данных в БД
 * @param {*} object.form Ссылка на форму. Так как форма для каждого модального окна своя, объявляется выше по стеку
 * @param {*} object.addMutation Запрос, который служит для добавления данных в БД при сабмите. Обычно дергается из /core/redux/api
 * @param {*} object.CreateUpdateForm Скелет окна без данных. Представляет форму с элементами
 * @returns
 */
export default function ModalInput({
  form,
  addMutation,
  CreateUpdateForm,
  customState,
  customDispatch,
  CreateUpdateFormProps = {},
  isAddConfirmOnCancel = true,
  isAddConfirmOnOk = true,
}) {
  const standardState = useTableModalsState();
  const standardDispatch = useTableModalDispatch();
  const state = customState ? customState() : standardState;
  const dispatch = customDispatch ? customDispatch() : standardDispatch;
  const [addFunc, { isError, isLoading, reset }] = addMutation();
  const isOpen = state.isShowCreateModal;

  const children = isOpen ? (
    <CreateUpdateForm form={form} {...CreateUpdateFormProps} />
  ) : (
    ""
  );
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
        console.log("Ошибка на форме создания:", info);
      });
  };

  const onCancel = () => {
    reset();
    form.resetFields();
    dispatch({ type: "closeAllModal" });
  };

  return (
    <Modal
      okText="Сохранить"
      cancelText="Отмена"
      destroyOnClose
      onOk={
        isAddConfirmOnOk
          ? () => {
              onOkConfirm(onFinish);
            }
          : onFinish
      }
      onCancel={
        isAddConfirmOnCancel
          ? () => {
              onCancelConfirm(onCancel);
            }
          : onCancel
      }
      open={isOpen}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? children : ""}
    </Modal>
  );
}
