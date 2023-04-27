// Просто отображает список файлов
import { Alert } from "antd";
import UploadList from "../../file/fileOutputs";

export default function DocumentFilesShow(props) {
  const { fileList, isTempFile = true } = props;
  if (!fileList || fileList.length === 0)
    return (
      <Alert
        type="error"
        message="У документа отсутствуют загруженные файлы"
        key="uploadedFilesListHeader"
      />
    );

  return (
    <UploadList
      fileList={fileList}
      isTempFile={isTempFile}
      key="uploadedFilesList"
    />
  );
}
