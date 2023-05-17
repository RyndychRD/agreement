import { Alert } from "antd";
import DocumentRegistrationButton from "./DocumentRegistrationButton";
import { HeaderTextOutput } from "../../outputs/textOutputs";
import { useGetDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import DocumentRegistrationSet from "./DocumentRegistrationSet";
import DocumentRegistrationShow from "./DocumentRegistrationShow";
import { DocumentTasksInnerTableProvider } from "../../tables/DocumentTasksInnerTableProvider";

/**
 * Фрагмент для отображения информации по регистрации документа и перевода в статус Документ в ООПЗ и Действующий
 * @param {*} props.documentId id документа для перевода в новый статус
 * @param {*} props.closeModalFunc функция закрытия родительского окна документа
 * @returns
 */
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
        <DocumentRegistrationButton
          documentId={documentId}
          closeModalFunc={closeModalFunc}
        />
      );
      break;
    /* Если документ находится в статусе Регистрация документа - показать форму для заполнения данных по регистрации документа */
    case 8:
      content = (
        <DocumentTasksInnerTableProvider>
          <DocumentRegistrationSet
            documentId={documentId}
            closeModalFunc={closeModalFunc}
          />
        </DocumentTasksInnerTableProvider>
      );
      break;
    /* Если документ находится в статусе Документы, подписанные в ООПЗ - показать заполненые данные по регистрации документа и дать перевести в Действующие */
    case 9:
      content = (
        <DocumentRegistrationShow
          documentId={documentId}
          closeModalFunc={closeModalFunc}
          isAddButton
        />
      );
      break;
    /* Если документ находится в статусе Документы, подписанные в ООПЗ, Действующие, Исполненные - просто показать заполненые данные по регистрации документа */
    case 10:
    case 11:
    case 12:
      content = (
        <DocumentRegistrationShow
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
      <HeaderTextOutput text="Регистрация документа" />
      {content}
    </>
  );
}
