import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { useGetCompletedDocumentTasksQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import DocumentTasksService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";
import ShowButtonModel from "./buttonModals/show";
// import ShowButtonModel from "./buttonModals/show";

export default function CompletedTasks() {
  const columns = {
    data: [
      "document_task_id",
      "document_task_problem",
      "document_task_created_at",
      "document_task_finished_at",
    ],
  };
  //   /**
  //    * При открытии форму подгружаем новые необходимые данные
  //    */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetCompletedDocumentTasksQueryHook({
    isAddForeignTables: false,
    isOnlyMyTasks: true,
  });

  if (!isAccessGranted("CompleteTasks")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentTasksService.prepareForTable(data) : null}
        title="Выполненные задачи"
        buttons={["update"]}
      />
      <ShowButtonModel />
    </TableModalProvider>
  );
}
