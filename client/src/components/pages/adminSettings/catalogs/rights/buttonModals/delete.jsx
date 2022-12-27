/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteRightMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/RightApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteRightMutation}
      deleteText={state.currentRow?.right_name}
    />
  );
}
