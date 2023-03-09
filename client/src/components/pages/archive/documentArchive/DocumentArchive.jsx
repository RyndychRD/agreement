import { useGetDocumentsQuery } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import { TableModalProvider } from "../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../services/userAccessService";
import { Error403 } from "../../../fragments/messages/Error";
import DocumentControlTableViewer from "../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import DocumentService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentService";
import ShowButtonModel from "./buttonModals/show";

/** Список документов, созданных пользователем */
export default function DocumentArchive() {
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_archive_type_name",
      "document_creator",
      "document_created_at",
      "document_finished_at",
      "document_passed_to_archive_at",
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
    status: "11",
    isShowAllDocs: true,
  });

  if (!isAccessGranted("DocumentArchive")) return <Error403 />;
  return (
    <TableModalProvider>
      <DocumentControlTableViewer
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        buttons={["update", "excel"]}
        dataSource={data ? DocumentService.prepareForTable(data) : null}
        title="Архив документов"
      />
      <ShowButtonModel />
    </TableModalProvider>
  );
}
