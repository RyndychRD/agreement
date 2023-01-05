import { AModal, ASpan } from "../../adapter";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import { useCustomDispatch, useCustomState } from "../tables/Provider";

/**
 * Возвращает React форму с стандартным сообщением при удалении
 */
function defaultDeleteMessage(deleteText) {
  return (
    <>
      Вы уверены что хотите удалить элемент?
      <br />
      <ASpan style={{ fontWeight: "bold", marginTop: "5px" }}>
        {deleteText}
      </ASpan>
    </>
  );
}

/**
 * Возвращает сообщение, отображаемое при удалении
 * @param {*} param0
 * @returns
 */
function getDeleteMessage({ customDeleteForm, deleteText }) {
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
 * @param {*} object.deleteMutation Мутация из /core/redux/api, которая удалит элемент
 * @param {*} object.deleteText Текст для дефолтного сообщения при удалении
 * @param {*} object.children Кастомная форма для отображения при удалении. Если не передана, заполняем стандартную форму текстом deleteText
 * @returns
 */
export default function ModalDelete({ deleteMutation, deleteText, children }) {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
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

  const deleteMessage = getDeleteMessage({
    customDeleteForm: children,
    deleteText,
  });

  return (
    <AModal
      okText="Удалить"
      cancelText="Отмена"
      onOk={onFinish}
      open={isOpen}
      onCancel={() => {
        reset();
        dispatch({ type: "closeAllModal" });
      }}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? deleteMessage : ""}
    </AModal>
  );
}
