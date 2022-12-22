/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals";
import { ASpan } from "../../../../../adapter";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import { useDeleteDepartmentMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const [deleteDepartment, { isLoading, isError, reset }] =
    useDeleteDepartmentMutation();

  /**
   * При удалении отправляем текущий выбранный элемент в сервис
   */
  const onFinish = async () => {
    console.log("Удалить элемент", state.currentRow);
    await deleteDepartment(state.currentRow).unwrap();
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
          {state.currentRow?.department_name}
        </ASpan>
      ) : (
        ""
      )}
    </ModalDelete>
  );
}
