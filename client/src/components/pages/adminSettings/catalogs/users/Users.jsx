// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetUsersQuery } from "../../../../../core/redux/api/AdminSettings/Catalogs/UserApi";
import UserAdminService from "../../../../../services/AdminServices/UserAdminService";

/** Справочник Должностей */
export default function Positions() {
  const columns = {
    data: [
      "user_id",
      "user_login",
      "user_email",
      "user_fio",
      "user_is_active",
      "position_name",
      "department_name",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetUsersQuery(true);
  return (
    <Provider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? UserAdminService.prepareForTable(data) : null}
        title="Пользователи"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </Provider>
  );
}
