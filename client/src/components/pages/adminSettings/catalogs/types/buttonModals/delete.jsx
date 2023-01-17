/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteTypeMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteTypeMutationHook}
      deleteText={state.currentRow?.type_name}
    />
  );
}
