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
  FileService.getFile({
    fileId: file.response?.fileId ? file.response.fileId : file.id,
    isForPreview: true,
  });
}
export function handlePushToDocument(props) {
  const { file, documentId, addFileIdToDocument } = props;
  openNotification(
    "Операция с файлом",
    "Файл добавлен в оригинальный документ"
  );
  addFileIdToDocument({ fileId: file.file_id, documentId });
}

/**
 *
 * @param file Является файлом из временного хранилища antd или ответом из БД
 * @returns
 */
export function handleDownload(props) {
  const { file, isTempFile = true } = props;
  // Если файл еще не полностью загрузился, не отображаем превью. Только для временных файлов. После сохранения в документ проверка не работает
  if (file.percent !== 100 && isTempFile) return;
  FileService.getFile({
    fileName: file.name,
    fileId: file.response?.fileId ? file.response.fileId : file.id,
  });
}
