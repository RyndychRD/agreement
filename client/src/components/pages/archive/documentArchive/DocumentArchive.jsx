import { useState } from "react";
import { LogProvider } from "../../../log/LogProvider";
import DocumentArchiveFilter from "./DocumentArchiveFilter";
import DocumentArchiveTable from "./DocumentArchiveTable";
import ArchiveLogService from "../../../../services/LogService/ArchiveLogService";

export default function DocumentArchive() {
  const [dataTable, setDataTable] = useState({});
  const { archiveTypes, dateRange, isFilterRun, isAllRange } = dataTable;

  return (
    <LogProvider
      logTypes={{
        logFilter: true,
        LogDocumentOpen: true,
        LogDocumentDownload: true,
      }}
      logFunctions={{
        LogDocumentOpen: (documentId) =>
          new ArchiveLogService().logUserOpenDocument(documentId),
        LogFileDownload: (fileId) =>
          new ArchiveLogService().logUserLoadDocumentFile(fileId),
        LogFilePreview: (fileId) =>
          new ArchiveLogService().logUserLoadDocumentFile(fileId, false),
      }}
    >
      <DocumentArchiveFilter setDataTable={setDataTable} />
      {isFilterRun ? (
        <DocumentArchiveTable
          archiveTypes={archiveTypes}
          dateRange={dateRange}
          isAllRange={isAllRange}
        />
      ) : (
        ""
      )}
    </LogProvider>
  );
}
