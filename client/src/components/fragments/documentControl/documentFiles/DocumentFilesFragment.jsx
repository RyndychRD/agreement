// Подгружает список файлов из БД
import DocumentFilesShow from "./DocumentFilesShow";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { useGetDocumentFilesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";

export default function DocumentFilesShowFragment(props) {
  const { documentId, isStart } = props;

  const {
    data: documentFiles = {},
    isLoading: isLoadingFiles,
    isError: isErrorFiles,
  } = useGetDocumentFilesQueryHook({ isStart, documentId });

  if (isLoadingFiles) return <SimpleSpinner />;
  if (isErrorFiles) return <SimpleError />;
  return (
    <DocumentFilesShow
      fileList={documentFiles}
      isTempFile={false}
      documentId={documentId}
    />
  );
}
