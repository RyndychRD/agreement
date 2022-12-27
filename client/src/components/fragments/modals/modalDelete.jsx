import { AModal, ASpan } from "../../adapter";
import SimpleError from "../spinners/Error";
import SimpleSpinner from "../spinners/Spinner";
import { useCustomDispatch, useCustomState } from "../tables/Provider";

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

  let deleteMessage = "Текст удаления не передан";
  if (children) {
    deleteMessage = children;
  } else if (deleteText) {
    deleteMessage = defaultDeleteMessage(deleteText);
  }
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
