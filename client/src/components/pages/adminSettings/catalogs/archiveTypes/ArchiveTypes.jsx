// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import ArchiveTypeService from "../../../../../services/AdminServices/ArchiveTypeService";
import { useGetArchiveTypesQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";

/** Справочник Департаментов */
export default function ArchiveTypes() {
  // const columns = useSelector((state) => state.departments.columns);
  const columns = {
    data: ["archive_type_id", "archive_type_name"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetArchiveTypesQueryHook(true);
  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? ArchiveTypeService.prepareForTable(data) : null}
        title="Типы архива"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
