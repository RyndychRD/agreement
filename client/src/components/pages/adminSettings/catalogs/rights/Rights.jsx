// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetRightsQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/RightApi";
import RightService from "../../../../../services/AdminServices/RightService";

/** Справочник Прав */
export default function Rights() {
  const columns = { data: ["right_id", "right_name", "right_code_name"] };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetRightsQueryHook();
  return (
    <Provider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? RightService.prepareForTable(data) : null}
        title="Права"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </Provider>
  );
}
