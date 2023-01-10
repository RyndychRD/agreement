/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteRightMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteRightMutationHook}
      deleteText={state.currentRow?.right_name}
    />
  );
}
