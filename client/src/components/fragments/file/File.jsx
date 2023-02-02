import FileService from "../../../services/FileService";
import openNotification from "../messages/Notification";

export async function handlePreview(props) {
  const { file, isTempFile = true } = props;
  // Если файл еще не полностью загрузился, не отображаем превью. Только для временных файлов. После сохранения в документ проверка не работает
  if (file.percent !== 100 && isTempFile) return;
  openNotification(
    "Подготовка к предпросмотру",
    "Файл подготавливается к предпросмотру"
  );
  const filePdf = await FileService.getFile({
    isTempFile,
    fileUuid: file.response?.savedFileName
      ? file.response.savedFileName
      : file.uniq,
    fileName: file.name,
    isConvertToPdf: true,
    isPDF: file.type === "application/pdf",
  });
  const file1 = new Blob([filePdf], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file1);
  window.open(fileURL);
}

export function handleDownload(props) {
  const { file, isTempFile = true } = props;
  // Если файл еще не полностью загрузился, не отображаем превью. Только для временных файлов. После сохранения в документ проверка не работает
  if (file.percent !== 100 && isTempFile) return;
  FileService.getFile({
    isTempFile,
    fileUuid: file.response?.savedFileName
      ? file.response.savedFileName
      : file.uniq,
    fileName: file.name,
    isConvertToPdf: false,
  });
}
