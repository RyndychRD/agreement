import { HeaderTextOutput } from "../../outputs/textOutputs";
import { useGetDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import DocumentToArchiveShow from "./documentToArchiveShow";

/**
 * Фрагмент для перемещения документа в архив
 * @param {*} props.documentId
 * @param {*} props.closeModalFunc Функция для закрытия модального окна
 * @returns
 */
export default function DocumentToArchiveFragment(props) {
  const { documentId, closeModalFunc } = props;
  const {
    data: document = {},
    isLoading,
    isError,
  } = useGetDocumentQueryHook({
    id: documentId,
    isAddForeignTables: true,
  });
  return (
    <>
      <HeaderTextOutput text="Перемещение в архив" />
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? (
        <DocumentToArchiveShow
          document={document}
          closeMainModal={closeModalFunc}
        />
      ) : (
        ""
      )}
    </>
  );
}
