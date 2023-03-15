// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import UpdateButtonModel from "./buttonModals/show";

import ArchiveLogTableService from "../../../../../services/AdminServices/ArchiveLogTableService";
import { useGetArchiveLogsQuery } from "../../../../../core/redux/api/AdminSettings/Logs/ArchiveLogApi";

/** Справочник Департаментов */
export default function ArchiveLogTable() {
  // const columns = useSelector((state) => state.departments.columns);
  const columns = {
    data: ["log_id", "log_user_fio", "archive_action_type", "log_created_at"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetArchiveLogsQuery(true);
  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        buttons={["update"]}
        dataSource={data ? ArchiveLogTableService.prepareForTable(data) : null}
        title="Лог действий пользователей в архиве"
      />
      <UpdateButtonModel />
    </TableModalProvider>
  );
}
