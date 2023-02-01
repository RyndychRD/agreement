// import { useSelector } from "react-redux";
import AdminSettingsTable from "../../../../fragments/tables/AdminSettings/AdminSettingsTable";

import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import CreateButtonModel from "./buttonModals/create";
import UpdateButtonModel from "./buttonModals/update";
import DeleteButtonAction from "./buttonModals/delete";

import { useGetDocumentTypesViewsHook } from "../../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import DocumentTypesViewsService from "../../../../../services/AdminServices/constructor/formConstructor/DocumentTypeViewsService";

/** конструктор маршрутов */

export default function FormConstructor() {
  const columns = {
    data: ["type_view_id", "type_name"],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetDocumentTypesViewsHook({
    isAddForeignTables: true,
  });

  return (
    <TableModalProvider>
      <AdminSettingsTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        dataSource={
          data ? DocumentTypesViewsService.prepareForTable(data) : null
        }
        title="Стандартные формы для типов документов"
      />
      <CreateButtonModel />
      <UpdateButtonModel />
      <DeleteButtonAction />
    </TableModalProvider>
  );
}
