import { useState } from "react";
import DocumentArchiveFilter from "./DocumentArchiveFilter";
import DocumentArchiveTable from "./DocumentArchiveTable";

export default function DocumentArchive() {
  const [dataTable, setDataTable] = useState({});
  const { archiveTypes, dateRange, isFilterRun, isAllRange } = dataTable;

  return (
    <>
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
    </>
  );
}
