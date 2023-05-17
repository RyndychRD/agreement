import FileService from "../../../services/FileService";
import openNotification from "../messages/Notification";

/**
 * Функция отображения предпросмотра файла
 * @param {*} props.file
 * @param {*} props.isTempFile
 * @param {*} props.log функция логирования того, что пользователь предпросмотрел файл
 * @returns
 */
export async function handlePreview(props) {
  const { file, isTempFile = true, log } = props;
  // Если файл еще не полностью загрузился, не отображаем превью. Только для временных файлов. После сохранения в документ проверка не работает
  if (file.percent !== 100 && isTempFile) return;
  openNotification(
    "Подготовка к предпросмотру",
    "Файл подготавливается к предпросмотру"
  );
  const fileId = file.response?.fileId ? file.response.fileId : file.file_id;
  if (log) log(fileId);
  FileService.getFile({
    fileId,
    isForPreview: true,
  });
}

/**
 * Функция добавления файла в изначальный документ. Сейчас используется в поручениях
 * @param {*} props.file
 * @param {*} props.documentId
 * @param {*} props.addFileIdToDocument
 */
export function handlePushToDocument(props) {
  const { file, documentId, addFileIdToDocument } = props;
  openNotification(
    "Операция с файлом",
    "Файл добавлен в оригинальный документ"
  );
  addFileIdToDocument({ fileId: file.file_id, documentId });
}

/**
 * Функция загрузки файла на компьютер пользователя
 * @param file Является файлом из временного хранилища antd или ответом из БД
 * @param isTempFile Если файл из БД, находится ли он в временном хранилище
 * @param log функция логирования того, что пользователь загрузил файл
 * @returns
 */
export function handleDownload(props) {
  const { file, isTempFile = true, log } = props;
  // Если файл еще не полностью загрузился, не отображаем превью. Только для временных файлов. После сохранения в документ проверка не работает
  if (file.percent !== 100 && isTempFile) return;
  const fileId = file.response?.fileId ? file.response.fileId : file.file_id;
  if (log) log(fileId);
  FileService.getFile({
    fileName: file.name,
    fileId,
  });
}
