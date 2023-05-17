import DocumentFilesShow from "./DocumentFilesShow";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { useGetDocumentFilesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import { HeaderTextOutput } from "../../outputs/textOutputs";
import { DocumentFilesEdit } from "./DocumentFilesEdit";

/**
 * Фрагмент для отображения загрузки файлов и догрузки файлов
 * @param {*} props.documentId Для какого документа отображать список файлов
 * @param {*} props.isStart флаг для старта загрузки списка файлов документов
 * @param {*} props.isAbleToUploadFiles флаг для добавления возможности загрузки документов
 * @returns
 */
export default function DocumentFilesShowFragment(props) {
  const { documentId, isStart, isAbleToUploadFiles } = props;

  const {
    data: documentFiles = {},
    isLoading: isLoadingFiles,
    isError: isErrorFiles,
  } = useGetDocumentFilesQueryHook({ isStart, documentId });

  if (isLoadingFiles) return <SimpleSpinner />;
  if (isErrorFiles) return <SimpleError />;
  return (
    <>
      <HeaderTextOutput
        text="Загруженные файлы"
        key="uploadedFilesListHeader"
      />
      <DocumentFilesShow fileList={documentFiles} isTempFile={false} />
      {isAbleToUploadFiles ? <DocumentFilesEdit documentId={documentId} /> : ""}
    </>
  );
}
