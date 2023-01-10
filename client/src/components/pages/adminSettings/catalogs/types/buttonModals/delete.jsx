/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteTypeMutation } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteTypeMutation}
      deleteText={state.currentRow?.type_name}
    />
  );
}
