import { useSelector } from "react-redux";
import { useGetDocumentsQuery } from "../../../../../core/redux/api/DocumentControl/Catalog/DocumentApi";
import DocumentService from "../../../../../services/DocumentServices/DocumentService";
// import FormBuilder from "../../../../formBuilder/FormBuilder";
import DocumentControlTableViewer from "../../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { Provider } from "../../../../fragments/tables/Provider";
// import CreateButtonModel from "../../adminSettings/catalogs/positions/buttonModals/create";
// import UpdateButtonModel from "../../adminSettings/catalogs/rights/buttonModals/update";
// import DeleteButtonAction from "../../adminSettings/catalogs/users/buttonModals/delete";

/** Список документов, созданных пользователем */
export default function RegistrationDocument() {
  const currentUser = useSelector((state) => state.session.current_user);
  const columns = {
    data: [
      "document_id",
      "document_name",
      "document_type",
      "document_status",
      "document_current_signer",
      "document_stage",
      "document_created_at",
      "document_updated_at",
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
    status: "8",
  });

  return (
    <>
      {/* <FormBuilder /> */}
      <Provider>
        <DocumentControlTableViewer
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          dataSource={data ? DocumentService.prepareForTable(data) : null}
          title="Документы"
        />
        {/* <CreateButtonModel />
			<UpdateButtonModel />
			<DeleteButtonAction /> */}
      </Provider>
    </>
  );
}
