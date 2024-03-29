/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { usePushDocumentTaskFileToDocumentMutationHook } from "../../../core/redux/api/DocumentControl/DocumentApi";
import { useLogState } from "../../log/LogProvider";
import { handlePreview, handleDownload, handlePushToDocument } from "./File";
import "./fileStyle.css";
import { renderDate, sorterStringAlphabet } from "../tables/CommonFunctions";

/**
 * Функция отображения одного файла в общем списке
 * @param {*} props.file
 * @param {*} props.isTempFile находится ли во временном хранилище на сервере
 * @param {*} props.isAddPushToDocumentButton добавить возможность запушить файл в документ? Используется в поручениях
 * @param {*} props.documentId
 * @returns
 */
export function UploadListItem(props) {
  const {
    file,
    isTempFile,
    isAddPushToDocumentButton = false,
    documentId,
  } = props;
  const {
    uniq: savedFileName,
    name: originalName,
    created_at: uploadedDateTime,
  } = file;

  const [addFileIdToDocument] = usePushDocumentTaskFileToDocumentMutationHook();

  let logDownload = () => {};
  let logPreview = () => {};

  const stateLog = useLogState();
  if (
    stateLog?.logTypes.LogDocumentOpen &&
    stateLog?.logFunctions.LogDocumentOpen
  ) {
    logDownload = (fileId) => stateLog.logFunctions.LogFileDownload(fileId);
    logPreview = (fileId) => stateLog.logFunctions.LogFilePreview(fileId);
  }
  const countNameSymbolsToShow = isAddPushToDocumentButton ? 35 : 45;
  return (
    <li
      className="ant-upload-list-item ant-upload-list-item-done"
      key={savedFileName}
    >
      <span href="" className="ant-upload-list-item-name" title={originalName}>
        {originalName.substring(0, countNameSymbolsToShow)}
        {originalName.length > countNameSymbolsToShow ? "..." : ""}
      </span>
      <div>
        <button
          title="Скачать"
          type="button"
          onClick={() => handleDownload({ file, isTempFile, log: logDownload })}
          className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm "
        >
          <span>
            <DownloadOutlined />
          </span>
        </button>
        <button
          title="Предпросмотр"
          type="button"
          onClick={() => handlePreview({ file, isTempFile, log: logPreview })}
          className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm "
        >
          <span>
            <EyeOutlined />
          </span>
        </button>
        {isAddPushToDocumentButton ? (
          <button
            title="Добавить файл в документ"
            type="button"
            onClick={() =>
              handlePushToDocument({ file, documentId, addFileIdToDocument })
            }
            className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm "
          >
            <span>Добавить файл в документ</span>
          </button>
        ) : (
          ""
        )}
        <span> {renderDate(uploadedDateTime)}</span>
      </div>
    </li>
  );
}

/**
 *
 * @param {fileList, isTempFile} props
 * @param {Array} fileList должен содержать в себе поля
 * @returns
 */
export default function UploadList(props) {
  const { fileList, isTempFile = true, children } = props;
  const sortedFileList =
    fileList && fileList.length > 0
      ? [...fileList].sort((a, b) => sorterStringAlphabet(a.name, b.name))
      : [];
  return (
    <ul className="category-list">
      {children ||
        sortedFileList.map((file) => (
          <UploadListItem key={file.id} file={file} isTempFile={isTempFile} />
        ))}
    </ul>
  );
}
