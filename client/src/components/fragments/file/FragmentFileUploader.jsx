import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import { useState } from "react";
import { API_URL } from "../../../http";
import openNotification from "../messages/Notification";
import { handlePreview, handleDownload } from "./File";

const { Dragger } = Upload;

const MAX_FILE_COUNT = 50;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_ACCEPTED_EXT = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
];

export default function FragmentFileUploader(props) {
  const { isRequired = true, fileList } = props;

  const rules = isRequired
    ? [
        {
          required: true,
          message: "Необходимо загрузить хотя бы один файл.",
        },
      ]
    : [];

  const [isAllFilesUploaded, setIsAllFilesUploaded] = useState(true);
  rules.push(() => ({
    validator() {
      if (isAllFilesUploaded) {
        return Promise.resolve();
      }
      return Promise.reject();
    },
  }));

  return (
    <Form.Item
      name="files"
      label="Файлы"
      valuePropName="fileUploading"
      labelCol={{ span: 24 }}
      rules={rules}
    >
      <FragmentDragger
        // Здесь поменяны местами превью и скачка для лучшего юзер экспиренса
        onPreview={(file) => handleDownload({ file })}
        onDownload={(file) =>
          handlePreview({
            file,
          })
        }
        defaultFileList={fileList}
        name="uploadedFile"
        // prettier-ignore
        action={`${API_URL}/files?token=${localStorage.getItem("token")}`}
        multiple
        maxCount={MAX_FILE_COUNT}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "Предпросмотр",
          showRemoveIcon: true,
        }}
        onChange={(info) => {
          const { status } = info.file;
          switch (status) {
            case "uploading":
              if (isAllFilesUploaded) {
                setIsAllFilesUploaded(false);
              }
              break;
            case "done":
              openNotification(
                "Файл загружен успешно",
                `${info.file.name} - загружен успешно.`
              );
              setIsAllFilesUploaded(true);
              break;
            case "error":
              openNotification(
                "Файл не загружен",
                `${info.file.name} - ошибка при загрузке.`
              );
              setIsAllFilesUploaded(true);
              break;
            default:
              console.log(`Текущий статус ${status}`);
          }
        }}
      />
    </Form.Item>
  );
}

function FragmentDragger(props) {
  return (
    <Dragger
      {...props}
      beforeUpload={(file) => {
        if (file.size > MAX_FILE_SIZE) {
          openNotification(
            "Файл не загружен",
            `Файл - ${file.name} :размер слишком большой.`
          );
          return Upload.LIST_IGNORE;
        }
        if (!FILE_ACCEPTED_EXT.includes(file.type)) {
          openNotification(
            "Файл не загружен",
            `Файл - ${file.name} :нельзя загружать такой тип файла.`
          );
          return Upload.LIST_IGNORE;
        }
        return true;
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Кликните мышью тут или перенесите файл на эту форму для загрузки файла
      </p>
      <p className="ant-upload-hint">
        Можно загружать за раз несколько файлов, но не больше {MAX_FILE_COUNT}{" "}
        штук. Поддерживаемые форматы: .png, .jpg, .jpeg, .xlsx, .xls, .doc,
        docx, .pdf, .odt
      </p>
    </Dragger>
  );
}
