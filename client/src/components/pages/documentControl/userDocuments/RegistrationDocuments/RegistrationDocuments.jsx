import { useSelector } from "react-redux";
import { useGetDocumentsQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import UpdateButtonModel from "./buttonModals/update";
import DocumentService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentService";

/** Список документов, созданных пользователем */
export default function RegistrationDocument() {
  const currentUser = useSelector((state) => state.session.current_user);
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_created_at",
      "document_updated_at",
      "document_tasks_type_3_status",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetDocumentsQueryHook({
    isAddForeignTables: true,
    userId: currentUser?.id ? currentUser.id : "-1",
    status: "8",
    addDocumentTasksByType: 3,
  });

  if (!isAccessGranted("OnRegistrationDocuments")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Документы на регистрации"
        buttons={["update"]}
      />
      <UpdateButtonModel />
    </TableModalProvider>
  );
}
