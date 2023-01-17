/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteDocumentMutationHook } from "../../../../../../core/redux/api/DocumentControl/Catalog/DocumentApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentMutationHook}
      deleteText={state.currentRow?.document_name}
    />
  );
}
