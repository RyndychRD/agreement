// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import DepartmentService from "../../../../../services/AdminServices/DepartmentService";
import { useGetDepartmentsQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

/** Справочник Департаментов */
export default function Departments() {
  // const columns = useSelector((state) => state.departments.columns);
  const columns = {
    data: ["department_id", "department_name", "rights_list"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetDepartmentsQueryHook(true);
  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? DepartmentService.prepareForTable(data) : null}
        title="Департаменты"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
