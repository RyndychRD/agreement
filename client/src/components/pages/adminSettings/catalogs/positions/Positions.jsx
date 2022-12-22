// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
// import CreateButtonModel from "./buttonModals/create";
// import DeleteButtonAction from "./buttonModals/delete";
// import UpdateButtonModel from "./buttonModals/update";

import { useGetPositionsQuery } from "../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import PositionService from "../../../../../services/AdminServices/PositionService";

/** Справочник Департаментов */
export default function Departments() {
  // const columns = useSelector((state) => state.departments.columns);
  const columns = { data: ["position_id", "position_name", "department_name"] };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetPositionsQuery();
  return (
    <Provider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? PositionService.prepareForTable(data) : null}
        title="Должности"
      />
      {/* <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction /> */}
    </Provider>
  );
}
