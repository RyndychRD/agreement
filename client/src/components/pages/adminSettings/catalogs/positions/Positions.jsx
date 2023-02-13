// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetPositionsQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import PositionService from "../../../../../services/AdminServices/PositionService";

/** Справочник Должностей */
export default function Positions() {
  const columns = {
    data: ["position_id", "position_name", "department_name", "rights_list"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetPositionsQueryHook({ isAddForeignTables: true, isAddRights: true });
  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? PositionService.prepareForTable(data) : null}
        title="Должности"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
