// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
// import CreateButtonModel from "./buttonModals/create";
// import DeleteButtonAction from "./buttonModals/delete";
// import UpdateButtonModel from "./buttonModals/update";

import { useGetRoutesQuery } from "../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import RouteService from "../../../../../services/AdminServices/constructor/RouteService";

/** конструктор маршрутов */

export default function RouteConstructor() {
  const columns = {
    data: [
      "route_id",
      "type_name",
      "position_route_constructor",
      "user_fio_route_constructor",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetRoutesQuery({ isAddForeignTables: true, isAddRights: true });
  console.log(
    "RouteService.prepareForTable(data)",
    RouteService.prepareForTable(data)
  );
  return (
    <Provider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? RouteService.prepareForTable(data) : null}
        title="Маршруты по должностям"
      />
      {/* <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction /> */}
    </Provider>
  );
}
