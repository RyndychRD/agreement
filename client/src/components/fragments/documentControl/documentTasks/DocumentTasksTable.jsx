import { useSelector } from "react-redux";
import { useGetDocumentTasksByDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import DocumentControlTableViewer from "../../tables/DocumentControl/DocumentControlTableViewer";
import DocumentTasksService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";
import {
  DocumentTasksInnerTableProvider,
  useDocumentTasksInnerTableDispatch,
  useDocumentTasksInnerTableState,
} from "../../tables/DocumentTasksInnerTableProvider";

import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import ShowButtonModel from "./buttonModals/show";

export default function DocumentTasksTable(props) {
  const { documentId, documentTypeId } = props;
  const columns = {
    data: [
      "document_task_id",
      "document_task_executor",
      "document_task_due_at",
      "document_task_status",
      "document_task_problem",
    ],
  };
  //   /**
  //    * При открытии форму подгружаем новые необходимые данные
  //    */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetDocumentTasksByDocumentQueryHook({
    isAddForeignTables: true,
    documentId,
  });

  const buttons = ["create", "update", "delete"];
  // Кнопка Запросить 2 раздел листа согласования доступна только для Директора департамента экономики и планирования
  // И только для типа документа Закуп ТРУ. И еще себя туда прописал, чтоб удобнее было
  const isShowSpecialTask =
    useSelector(
      (state) =>
        state.session.current_user.position_id === 14 ||
        state.session.current_user.id === 1
    ) && documentTypeId === 27;
  if (isShowSpecialTask) {
    buttons.unshift("createSpecialTask");
  }

  return (
    <DocumentTasksInnerTableProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        buttons={buttons}
        dataSource={data ? DocumentTasksService.prepareForTable(data) : null}
        title="Поручения по документу"
        customDispatch={useDocumentTasksInnerTableDispatch}
        customState={useDocumentTasksInnerTableState}
        // Не работает, служит просто как заглушка
        queryIdNameForOpen="taskId"
        notificationType="CompleteTask"
      />

      <CreateButtonModel documentId={documentId} />
      <ShowButtonModel />
      <DeleteButtonAction />
    </DocumentTasksInnerTableProvider>
  );
}
