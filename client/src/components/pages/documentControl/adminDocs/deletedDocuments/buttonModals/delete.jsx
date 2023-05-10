/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteDocumentMutationHook } from "../../../../../../core/redux/api/DocumentControl/DocumentApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete deleteMutation={useDeleteDocumentMutationHook} isAbleToDelete>
      <span>
        Вы действительно хотите окончательно удалить документ
        <b> {state.currentRow?.document_name} </b>и все данные, связанные с ним?
      </span>
    </ModalDelete>
  );
}
