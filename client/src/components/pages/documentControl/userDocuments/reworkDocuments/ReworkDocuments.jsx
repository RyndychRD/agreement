import { useSelector } from "react-redux";
import { useGetDocumentsQuery } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentService from "../../../../../services/DocumentServices/DocumentService";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { TableModalProvider } from "../../../../fragments/tables/TableModalProvider";
import { isAccessGranted } from "../../../../../services/userAccessService";
import { Error403 } from "../../../../fragments/messages/Error";
import UpdateButtonModel from "./buttonModals/update";

/** Список документов, созданных пользователем */
export default function ReworkDocument() {
  const currentUser = useSelector((state) => state.session.current_user);
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_remark",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const {
    data = [],
    isLoading,
    isError,
  } = useGetDocumentsQuery({
    isAddForeignTables: true,
    userId: currentUser?.id ? currentUser.id : "-1",
    status: "7",
  });

  if (!isAccessGranted("ReworkDocuments")) return <Error403 />;
  return (
    <>
      {/* <FormBuilder /> */}
      <TableModalProvider>
        <DocumentControlTableViewer
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          dataSource={data ? DocumentService.prepareForTable(data) : null}
          title="Документы на доработку"
          buttons={["update"]}
          notificationType="ReworkDocument"
        />
        <UpdateButtonModel />
      </TableModalProvider>
    </>
  );
}
