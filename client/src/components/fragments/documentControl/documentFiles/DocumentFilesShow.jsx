// Просто отображает список файлов
import { Alert } from "antd";
import UploadList from "../../file/fileOutputs";
import { sorterStringAlphabet } from "../../tables/CommonFunctions";

export default function DocumentFilesShow(props) {
  const { fileList, isTempFile = true } = props;
  if (fileList.length === 0)
    return (
      <Alert
        type="error"
        message="У документа отсутствуют загруженные файлы"
        key="uploadedFilesListHeader"
      />
    );
  const sortedFileList = [...fileList].sort((a, b) =>
    sorterStringAlphabet(a.name, b.name)
  );
  return (
    <UploadList
      fileList={sortedFileList}
      isTempFile={isTempFile}
      key="uploadedFilesList"
    />
  );
}
