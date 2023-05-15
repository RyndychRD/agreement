import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import UpdateButtonModel from "./buttonModals/update";
import { useGetDocumentsQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import DocumentService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentService";

/** Список документов, созданных пользователем */
export default function MySingedDocuments() {
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_stage",
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
  } = useGetDocumentsQueryHook({
    isAddForeignTables: true,
    isOnlyMySignedDocuments: true,
    isFindContractorInValues: true,
  });

  if (!isAccessGranted("MySignedDocuments")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Подписанные мною документы"
        buttons={["update"]}
      />
      <UpdateButtonModel />
    </TableModalProvider>
  );
}
