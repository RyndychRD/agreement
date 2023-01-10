// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { Provider } from "../../../../fragments/tables/Provider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetUsersQuery } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
import UserService from "../../../../../services/AdminServices/UserService";

/** Справочник Пользователей */
export default function Users() {
  const columns = {
    data: [
      "user_id",
      "user_login",
      "user_email",
      "user_fio",
      "user_is_disabled",
      "position_name",
      "department_name",
      "rights_list",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetUsersQuery({ isAddForeignTables: true, isAddRights: true });
  return (
    <Provider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={data ? UserService.prepareForTable(data) : null}
        title="Пользователи"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </Provider>
  );
}
