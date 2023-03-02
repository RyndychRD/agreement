import { HeaderTextOutput } from "../../outputs/textOutputs";
import { useGetDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import DocumentToArchiveShow from "./documentToArchiveShow";

export default function DocumentToArchiveFragment(props) {
  return "";
  const { documentId, closeModalFunc } = props;
  const {
    data: document = {},
    isLoading,
    isError,
  } = useGetDocumentQueryHook({
    id: documentId,
    // Пока что не реализовано
    isGetDocumentArchiveType: true,
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
