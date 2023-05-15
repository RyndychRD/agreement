import { useGetDocumentsQuery } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import UpdateButtonModel from "./buttonModals/update";
import DocumentService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentService";

/** Список документов, созданных пользователем */
export default function SignedInOOPZDocuments() {
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_created_at",
      "document_updated_at",
      "document_creator",
      "document_contractor",
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
    isShowAllDocs: true,
    status: "9",
    isFindContractorInValues: true,
  });

  if (!isAccessGranted("OnRegistrationDocuments")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Документы, подписанные в ООПЗ"
        buttons={["update"]}
        notificationType="SignedOOPZ"
      />
      <UpdateButtonModel />
    </TableModalProvider>
  );
}
