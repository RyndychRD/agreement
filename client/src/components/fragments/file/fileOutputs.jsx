/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Upload } from "antd";
import { handlePreview, handleDownload } from "./File";

function UploadListItem(file, isTempFile) {
  const { uniq: savedFileName, name: originalName } = file;

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
        {originalName}
      </span>
      <span className="ant-upload-list-item-actions">
        <button
          title="Предпросмотр"
          type="button"
          onClick={() => handlePreview({ file, isTempFile })}
          className="ant-btn css-dev-only-do-not-override-1ij74fp ant-btn-text ant-btn-sm ant-upload-list-item-action"
        >
          <span>Предпросмотр</span>
        </button>
      </span>
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
              {fileList.map((file) => UploadListItem(file, isTempFile))}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
