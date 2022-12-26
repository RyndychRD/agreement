/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals";
import { ASpan } from "../../../../../adapter";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import { useDeleteUserMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/UserApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const [deleteUser, { isLoading, isError, reset }] = useDeleteUserMutation();

  /**
   * При удалении отправляем текущий выбранный элемент в сервис
   */
  const onFinish = async () => {
    console.log("Удалить элемент", state.currentRow);
    await deleteUser(state.currentRow).unwrap();
    if (!isError) {
      dispatch({ type: "closeAllModal" });
    }
  };

  return (
    <ModalDelete
      open={state.isShowDeleteModal && state.currentRow}
      isLoading={isLoading}
      isError={isError}
      onOk={onFinish}
      onCancel={() => {
        reset();
        dispatch({ type: "closeAllModal" });
      }}
    >
      {state.isShowDeleteModal ? (
        <ASpan style={{ fontWeight: "bold", marginTop: "5px" }}>
          {state.currentRow?.user_fio}
        </ASpan>
      ) : (
        ""
      )}
    </ModalDelete>
  );
}
