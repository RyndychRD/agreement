/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteDocumentSoftMutationHook } from "../../../../../../core/redux/api/DocumentControl/DocumentApi";

export default function DeleteButtonModal() {
  const state = useTableModalsState();

  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentSoftMutationHook}
      deleteText={state.currentRow?.document_name}
      isAbleToDelete={state.currentRow?.is_document_able_to_delete}
    />
  );
}
