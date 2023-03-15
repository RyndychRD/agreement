import { TableModalProvider } from "../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../services/userAccessService";
import { Error403 } from "../../../fragments/messages/Error";
import DocumentControlTableViewer from "../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import DocumentService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentService";
import ShowButtonModel from "./buttonModals/show";
import { useGetDocumentArchivesQueryHook } from "../../../../core/redux/api/Archive/DocumentArchive";

import "./style.css";

/** Список документов, созданных пользователем */
export default function DocumentArchiveTable(props) {
  const { archiveTypes, dateRange, isAllRange } = props;
  const { data, isLoading, isError } = useGetDocumentArchivesQueryHook({
    archiveTypes: JSON.stringify(archiveTypes),
    dateRange: JSON.stringify(isAllRange ? {} : dateRange),
  });
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
