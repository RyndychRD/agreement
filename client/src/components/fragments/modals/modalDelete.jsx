import { Alert, Modal } from "antd";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";

/**
 * Возвращает React форму с стандартным сообщением при удалении
 * @param {*} deleteText
 * @returns
 */
function defaultDeleteMessage(deleteText) {
  return (
    <>
      Вы уверены что хотите удалить элемент?
      <br />
      <span style={{ fontWeight: "bold", marginTop: "5px" }}>{deleteText}</span>
    </>
  );
}

/**
 * Возвращает сообщение, отображаемое при удалении
 * @param {*} props.customDeleteForm
 * @param {*} props.deleteText
 * @returns
 */
function getDeleteMessage(props) {
  const { customDeleteForm, deleteText } = props;
  let deleteMessage = "Текст удаления не передан";
  if (customDeleteForm) {
    deleteMessage = customDeleteForm;
  } else if (deleteText) {
    deleteMessage = defaultDeleteMessage(deleteText);
  }
  return deleteMessage;
}

/**
 * Отвечает за отображение подтверждения при удалении элемента
 * @param {*} props.deleteMutation Мутация из /core/redux/api, которая удалит элемент
 * @param {*} props.deleteText Текст для дефолтного сообщения при удалении
 * @param {*} props.children Кастомная форма для отображения при удалении. Если не передана, заполняем стандартную форму текстом deleteText
 * @param {*} props.customState Можно передать кастомный стайт для использовании внутри другого провайдера
 * @param {*} props.customDispatch Можно передать кастомный диспатчер для использовании внутри другого провайдера
 * @param {*} props.isAbleToDelete Можно ли произвести удаление элемента? Если нет, высветится стандартное сообщение об ошибке
 * @returns
 */
export default function ModalDelete(props) {
  const {
    deleteMutation,
    deleteText,
    children,
    customState,
    customDispatch,
    isAbleToDelete = true,
  } = props;
  const standardState = useTableModalsState();
  const standardDispatch = useTableModalDispatch();
  const state = customState ? customState() : standardState;
  const dispatch = customDispatch ? customDispatch() : standardDispatch;
  const isOpen = state.isShowDeleteModal && state.currentRow;
  const [deleteFunc, { isLoading, isError, reset }] = deleteMutation();

  /**
   * При удалении отправляем текущий выбранный элемент в сервис
   */
  const onFinish = async () => {
    console.log("Удалить элемент", state.currentRow);
    await deleteFunc(state.currentRow).unwrap();
    if (!isError) {
      dispatch({ type: "closeAllModal" });
    }
  };

  const onCancel = () => {
    reset();
    dispatch({ type: "closeAllModal" });
  };

  const deleteMessage = getDeleteMessage({
    customDeleteForm: children,
    deleteText,
  });

  return (
    <Modal
      okText={isAbleToDelete ? "Удалить" : "Закрыть"}
      cancelText="Отмена"
      onOk={isAbleToDelete ? onFinish : onCancel}
      open={isOpen}
      onCancel={onCancel}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isAbleToDelete ? (
        <Alert message="Невозможно удалить элемент" type="error" />
      ) : (
        ""
      )}
      {isAbleToDelete && !isLoading && !isError && isOpen ? deleteMessage : ""}
    </Modal>
  );
}
