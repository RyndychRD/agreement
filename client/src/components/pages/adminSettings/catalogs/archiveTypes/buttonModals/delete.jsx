/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteArchiveTypeMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteArchiveTypeMutationHook}
      deleteText={state.currentRow?.archive_type_name}
    />
  );
}
