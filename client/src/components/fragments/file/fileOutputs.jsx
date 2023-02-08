/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { EyeOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { usePushDocumentTaskFileToDocumentMutationHook } from "../../../core/redux/api/DocumentControl/DocumentApi";
import { handlePreview, handleDownload, handlePushToDocument } from "./File";

export function UploadListItem(props) {
  const {
    file,
    isTempFile,
    isAddPushToDocumentButton = false,
    documentId,
  } = props;
  const { uniq: savedFileName, name: originalName } = file;

  const [addFileIdToDocument] = usePushDocumentTaskFileToDocumentMutationHook();

  return (
    <div
      className="ant-upload-list-item ant-upload-list-item-done"
      key={savedFileName}
    >
      <span
        className="ant-upload-list-item-name"
        title={originalName}
        onClick={() => handleDownload({ file, isTempFile })}
      >
        {originalName.substring(0, 30)}
        {originalName.length > 30 ? "..." : ""}
      </span>
      <span className="ant-upload-list-item-actions">
        <button
          title="Предпросмотр"
          type="button"
          onClick={() => handlePreview({ file, isTempFile })}
          className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm ant-upload-list-item-action"
        >
          <span>
            <EyeOutlined />
          </span>
        </button>
      </span>
      {isAddPushToDocumentButton ? (
        <span className="ant-upload-list-item-actions">
          <button
            title="Добавить файл в документ"
            type="button"
            onClick={() =>
              handlePushToDocument({ file, documentId, addFileIdToDocument })
            }
            className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm ant-upload-list-item-action"
          >
            <span>Добавить файл в документ</span>
          </button>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

/**
 *
 * @param {fileList, isTempFile} props
 * @param {Array} fileList должен содержать в себе поля
 * @returns
 */
export default function UploadList(props) {
  const { fileList, isTempFile = true } = props;
  return (
    <div className="ant-col ant-form-item-control css-dev-only-do-not-override-1ij74fp">
      {/* FIXME: Используется только для подгрузки нужного css. Удалить в следующей ревизии */}
      <Upload />
      <div className="ant-form-item-control-input">
        <div className="ant-form-item-control-input-content">
          <span className="ant-upload-wrapper css-dev-only-do-not-override-1ij74fp">
            <div className="ant-upload-list ant-upload-list-text">
              <div className="ant-upload-list-item-container" />
              {fileList.map((file) => (
                <UploadListItem
                  key={file.id}
                  file={file}
                  isTempFile={isTempFile}
                />
              ))}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
