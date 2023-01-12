/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteDocumentMutationHook } from "../../../../../../core/redux/api/DocumentControl/Catalog/DocumentApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentMutationHook}
      deleteText={state.currentRow?.document_name}
    />
  );
}
