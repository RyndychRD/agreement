import { useSelector } from "react-redux";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { useGetIncomeDocumentTasksQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import DocumentTasksService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";

export default function IncomeTasks() {
  const currentUser = useSelector((state) => state.session.current_user);
  const columns = {
    data: [
      "document_task_id",
      "document_task_problem",
      "document_task_status",
      "document_task_due_at",
      "document_task_creator",
      "document_task_created_at",
    ],
  };
  //   /**
  //    * При открытии форму подгружаем новые необходимые данные
  //    */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetIncomeDocumentTasksQueryHook({
    isAddForeignTables: true,
    userId: currentUser?.id ? currentUser.id : "-1",
    status: "10",
  });

  if (!isAccessGranted("IncomeTasks")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentTasksService.prepareForTable(data) : null}
        title="Входящие задачи"
        buttons={["update"]}
      />
      {/* <UpdateButtonModel /> */}
    </TableModalProvider>
  );
}
