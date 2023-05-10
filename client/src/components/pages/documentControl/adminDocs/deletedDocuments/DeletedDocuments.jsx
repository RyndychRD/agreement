import { useSelector } from "react-redux";
import { useGetDocumentsQuery } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";
import DocumentService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentService";

/** Список документов, созданных пользователем */
export default function DeletedDocuments() {
  const currentUser = useSelector((state) => state.session.current_user);
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_status_before_soft_delete_name",
      "document_created_at",
      "document_creator",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetDocumentsQuery({
    isAddForeignTables: true,
    userId: currentUser?.id ? currentUser.id : "-1",
    isShowAllDocs: true,
    status: "13",
    isShowDeletedDocs: true,
  });

  if (!isAccessGranted("Admin")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Удаленные документы"
        buttons={["update", "restore", "delete"]}
      />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
