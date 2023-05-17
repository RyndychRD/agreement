/* eslint-disable react/react-in-jsx-scope */
import { useDeleteDocumentTaskMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import ModalDelete from "../../../modals/modalDelete";
import {
  useDocumentTasksInnerTableDispatch,
  useDocumentTasksInnerTableState,
} from "../../../tables/DocumentTasksInnerTableProvider";

/**
 * Модальное окно при удалении поручения
 * @returns
 */
export default function DeleteButtonAction() {
  const state = useDocumentTasksInnerTableState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentTaskMutationHook}
      deleteText={state.currentRow?.document_task_problem}
      customState={useDocumentTasksInnerTableState}
      customDispatch={useDocumentTasksInnerTableDispatch}
    />
  );
}
