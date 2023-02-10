import { Alert } from "antd";
import DocumentMitvorgRegistrationButton from "./DocumentMitvorgRegistrationButton";
import { HeaderTextOutput } from "../../outputs/textOutputs";
import { useGetDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import DocumentMitvorgRegistrationSet from "./DocumentMitvorgRegistrationSet";
import DocumentMitvorgRegistrationShow from "./DocumentMitvorgRegistrationShow";

export default function DocumentRegistrationFragment(props) {
  const { documentId, closeModalFunc } = props;
  const { data: document = {}, isLoading: isLoadingDocument } =
    useGetDocumentQueryHook({
      id: documentId,
      isAddForeignTables: true,
    });
  if (isLoadingDocument) return <SimpleSpinner />;

  let content = "";
  switch (document.document_status_id) {
    /* Если документ находится в статусе Согласован - показать кнопку Отправить на регистрацию */
    case 4:
      content = (
        <DocumentMitvorgRegistrationButton
          documentId={documentId}
          closeModalFunc={closeModalFunc}
        />
      );
      break;
    /* Если документ находится в статусе Регистрация документа - показать форму для заполнения данных от Митворг */
    case 8:
      content = (
        <DocumentMitvorgRegistrationSet
          documentId={documentId}
          closeModalFunc={closeModalFunc}
        />
      );
      break;
    /* Если документ находится в статусе Документы, подписанные в ООПЗ - показать заполненые данные от Митворг и дать перевести в Исполненные */
    case 9:
      content = (
        <DocumentMitvorgRegistrationShow
          documentId={documentId}
          closeModalFunc={closeModalFunc}
          isAddButton
        />
      );
      break;
    /* Если документ находится в статусе Документы, подписанные в ООПЗ - просто показать заполненые данные от Митворг */
    case 10:
      content = (
        <DocumentMitvorgRegistrationShow
          documentId={documentId}
          closeModalFunc={closeModalFunc}
        />
      );
      break;
    default:
      content = (
        <Alert
          type="error"
          message={`Для статуса ${document.document_status_id} не найден отображаемый контент`}
        />
      );
      break;
  }

  return (
    <>
      <HeaderTextOutput text="Регистрация в Митворг" />
      {content}
    </>
  );
}
