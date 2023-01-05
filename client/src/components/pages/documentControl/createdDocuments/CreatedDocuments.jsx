import { useGetDocumentsQuery } from "../../../../core/redux/api/DocumentControl/Catalog/DocumentApi";
import DocumentService from "../../../../services/DocumentServices/DocumentService";
import FormBuilder from "../../../formBuilder/FormBuilder";
import DocumentControlTableViewer from "../../../fragments/tables/DocumentControl/DocumentControlTableViewer";
import { Provider } from "../../../fragments/tables/Provider";
// import CreateButtonModel from "../../adminSettings/catalogs/positions/buttonModals/create";
// import UpdateButtonModel from "../../adminSettings/catalogs/rights/buttonModals/update";
// import DeleteButtonAction from "../../adminSettings/catalogs/users/buttonModals/delete";

/** Справочник Прав */
export default function CreatedDocument() {
  const columns = {
    data: [
      "document_id",
      "document_status_id",
      "document_type_id",
      "document_creator_id",
      "document_name",
      "document_created_at",
      "document_updated_at",
      "document_finished_at",
    ],
  };
  /**
   * При открытии форму подгружаем новые необходимые данные
   */
  const { data = [], isLoading, isError } = useGetDocumentsQuery();
  return (
    <>
      <FormBuilder />
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
