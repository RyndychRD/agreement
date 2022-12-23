/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals";
import { ASpan } from "../../../../../adapter";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import { useDeletePositionMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const [deletePosition, { isLoading, isError, reset }] =
    useDeletePositionMutation();

  /**
   * При удалении отправляем текущий выбранный элемент в сервис
   */
  const onFinish = async () => {
    console.log("Удалить элемент", state.currentRow);
    await deletePosition(state.currentRow).unwrap();
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
          {state.currentRow?.position_name}
        </ASpan>
      ) : (
        ""
      )}
    </ModalDelete>
  );
}
