// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import DepartmentService from "../../../../../services/AdminServices/DepartmentService";
import { useGetDepartmentsQuery } from "../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";

/** Справочник Департаментов */
export default function Departments() {
  // const columns = useSelector((state) => state.departments.columns);
  const columns = {
    data: ["department_id", "department_name", "rights_list"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetDepartmentsQuery(true);
  return (
    <Provider>
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
    </Provider>
  );
}
