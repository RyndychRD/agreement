// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetTypesQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import TypeService from "../../../../../services/AdminServices/TypeService";

/** Справочник Прав */
export default function Types() {
  const columns = { data: ["type_id", "type_name"] };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetTypesQueryHook();
  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? TypeService.prepareForTable(data) : null}
        title="Права"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
