import { useGetDocumentTasksByDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import DocumentControlTableViewer from "../../tables/DocumentControl/DocumentControlTableViewer";
import DocumentTasksService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";
import {
  InnerTableModalProvider,
  useInnerTableDispatch,
  useInnerTableState,
} from "../../tables/InnerTableProvider";

import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import ShowButtonModel from "./buttonModals/show";

export default function DocumentTasksTable(props) {
  const { documentId } = props;
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
  return (
    <InnerTableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentTasksService.prepareForTable(data) : null}
        title="Поручения по документу"
        customDispatch={useInnerTableDispatch}
        customState={useInnerTableState}
        // Не работает, служит просто как заглушка
        queryIdNameForOpen="taskId"
      />

      <CreateButtonModel documentId={documentId} />
      <ShowButtonModel />
      <DeleteButtonAction />
    </InnerTableModalProvider>
  );
}