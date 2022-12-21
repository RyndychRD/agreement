import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import DepartmentService from "../../../../../services/AdminServices/DepartmentService";
import { getAllDepartments } from "./DepartmentsReducer";

/** Справочник Департаментов */
export default function Departments() {
  const columns = useSelector((state) => state.departments.columns);
  const data = useSelector((state) => state.departments.departmentsList);
  const dispatch = useDispatch();
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  useEffect(() => {
    dispatch(getAllDepartments());
  }, []);

  return (
    <Provider>
      <AdminSettingsTable
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
