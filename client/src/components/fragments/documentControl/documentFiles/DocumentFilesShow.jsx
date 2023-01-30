// Просто отображает список файлов
import { HeaderTextOutput } from "../../outputs/textOutputs";
import UploadList from "../../file/fileOutputs";

export default function DocumentFilesShow(props) {
  const { fileList, isTempFile = true } = props;
  if (fileList.length === 0)
    return (
      <HeaderTextOutput
        text="У документа отсутствуют загруженные файлы"
        key="uploadedFilesListHeader"
      />
    );
  return (
    <>
      <HeaderTextOutput
        text="Загруженные файлы"
        key="uploadedFilesListHeader"
      />
      <UploadList
        fileList={fileList}
        isTempFile={isTempFile}
        key="uploadedFilesList"
      />
    </>
  );
}
