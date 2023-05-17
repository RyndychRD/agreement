import { Modal } from "antd";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import { onCancelConfirm } from "../tables/CommonFunctions";
import {
  useTableModalsState,
  useTableModalDispatch,
} from "../tables/TableModalProvider";
import ModalConfirm from "./ModalConfirm";

/**
 * Общее окно для отображения модального окна добавления чего либо.
 * При сабмите вызывает функцию для добавления данных в БД
 * @param {*} props.form Ссылка на форму. Так как форма для каждого модального окна своя, объявляется выше по стеку
 * @param {*} props.addMutation Запрос, который служит для добавления данных в БД при сабмите. Обычно дергается из /core/redux/api
 * @param {*} props.CreateUpdateForm Скелет окна без данных. Представляет форму с элементами
 * @param {*} props.customState Кастомный стайт для использовании внутри другого провайдера
 * @param {*} props.customDispatch Кастомный диспатч для исопльзования внутри другого провайдера
 * @param {*} props.CreateUpdateFormProps Дополнительные флаги для скелета CreateUpdateForm
 * @param {*} props.isAddConfirmOnCancel Добавить ли подтверждение при попытке закрыть документ
 * @param {*} props.isAddConfirmOnOk Добавить ли подтверждение при попытке сохранить данные
 * @param {*} props.confirmOnOkContent Что отображать при подтверждении при попытке сохранить данные
 * @param {*} props.afterFinishFunc Функция, которая будет выполнена после сохранения данных
 * @returns
 */
export default function ModalInput(props) {
  const {
    form,
    addMutation,
    CreateUpdateForm,
    customState,
    customDispatch,
    CreateUpdateFormProps = {},
    isAddConfirmOnCancel = true,
    isAddConfirmOnOk = true,
    confirmOnOkContent = "Вы точно хотите продолжить?",
    afterFinishFunc = () => {},
  } = props;
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
          afterFinishFunc();
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
              ModalConfirm({
                content: confirmOnOkContent,
                onOk: () => {
                  onFinish();
                },
                okText: "Да",
                cancelText: "Нет",
              });
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
