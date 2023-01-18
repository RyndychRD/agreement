import DocumentService from "../../../../../services/DocumentServices/DocumentService";
// import FormBuilder from "../../../../formBuilder/FormBuilder";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import UpdateButtonModel from "./buttonModals/update";
import { useGetDocumentsQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";

/** Список документов, созданных пользователем */
export default function ForSigningDocuments() {
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_stage",
      "document_created_at",
      "document_updated_at",
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
    isOnlyForSigningDocuments: true,
    status: 0,
  });

  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Документы"
      />
      <UpdateButtonModel />
    </TableModalProvider>
  );
}
