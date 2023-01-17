import DocumentService from "../../../../../services/DocumentServices/DocumentService";
// import FormBuilder from "../../../../formBuilder/FormBuilder";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
// import CreateButtonModel from "./buttonModals/create";
// import UpdateButtonModel from "./buttonModals/update";
// import DeleteButtonAction from "./buttonModals/delete";
import { useGetDocumentsQueryHook } from "../../../../../core/redux/api/DocumentControl/Catalog/DocumentApi";

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
      {/* <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction /> */}
    </TableModalProvider>
  );
}
