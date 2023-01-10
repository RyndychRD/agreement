// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetTypesQuery } from "../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import TypeService from "../../../../../services/AdminServices/TypeService";

/** Справочник Прав */
export default function Types() {
  const columns = { data: ["type_id", "type_name"] };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetTypesQuery();
  return (
    <Provider>
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
    </Provider>
  );
}
