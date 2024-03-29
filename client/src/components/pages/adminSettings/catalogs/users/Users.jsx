// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import DeleteButtonAction from "./buttonModals/delete";
import UpdateButtonModel from "./buttonModals/update";

import { useGetUsersQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
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
  } = useGetUsersQueryHook({ isAddForeignTables: true, isAddRights: true });
  return (
    <TableModalProvider>
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
    </TableModalProvider>
  );
}
