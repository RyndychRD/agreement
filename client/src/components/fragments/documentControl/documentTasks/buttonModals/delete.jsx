/* eslint-disable react/react-in-jsx-scope */
import { useDeleteDocumentTaskMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import ModalDelete from "../../../modals/modalDelete";
import {
  useInnerTableDispatch,
  useInnerTableState,
} from "../../../tables/InnerTableProvider";

export default function DeleteButtonAction() {
  const state = useInnerTableState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentTaskMutationHook}
      deleteText={state.currentRow?.document_task_problem}
      customState={useInnerTableState}
      customDispatch={useInnerTableDispatch}
    />
  );
}
