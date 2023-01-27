import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, notification } from "antd";
import FileService from "../../../services/FileService";

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

const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};
const handlePreview = (file) => {
  // Если файл еще не полностью загрузился, не отображаем превью
  if (file.percent !== 100) return;
  FileService.getFile({
    isTempFile: true,
    fileUuid: file.response.savedFileName,
    fileName: file.response.originalName,
    isConvertToPdf: false,
  });
};
const handleDownload = async (props) => {
  const { file } = props;
  // Если файл еще не полностью загрузился, не отображаем превью
  if (file.percent !== 100) return;
  openNotification(
    "Подготовка к предпросмотру",
    "Файл подготавливается к предпросмотру"
  );
  console.log(file);
  const filePdf = await FileService.getFile({
    isTempFile: true,
    fileUuid: file.response.savedFileName,
    fileName: file.response.originalName,
    isConvertToPdf: true,
    isPDF: file.originFileObj.type === "application/pdf",
  });
  const file1 = new Blob([filePdf], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file1);
  window.open(fileURL);
};
export default function FragmentUploader() {
  return (
    <Form.Item
      name="files"
      label="Файлы"
      valuePropName="fileUploading"
      labelCol={{ span: 24 }}
      rules={[
        {
          required: true,
          message: "Необходимо загрузить хотя бы один файл.",
        },
      ]}
    >
      <UploadFile
        isAbleToUpload
        onPreview={handlePreview}
        onDownload={(file) =>
          handleDownload({
            file,
          })
        }
        name="uploadedFile"
        // prettier-ignore
        action={`http://localhost:5000/api/files?token=${localStorage.getItem("token")}`}
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
            case "done":
              openNotification(
                "Файл загружен успешно",
                `${info.file.name} - загружен успешно.`
              );
              break;
            case "error":
              openNotification(
                "Файл не загружен",
                `${info.file.name} - ошибка при загрузке.`
              );
              break;
            default:
              console.log(`Текущий статус ${status}`);
          }
        }}
      />
    </Form.Item>
  );
}

function UploadFile(props) {
  const { isAbleToUpload } = props;
  if (isAbleToUpload)
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
  return null;
}
