/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteRightMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteRightMutationHook}
      deleteText={state.currentRow?.right_name}
    />
  );
}
