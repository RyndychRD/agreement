/** @format */

import { api } from "../http/index";

export default class FileService {
  static async getFile(props) {
    const {
      fileName,
      fileId,
      isForPreview = false,
      isReturnRawData = false,
    } = props;
    console.log("вызов в FileService -> getFile c параметрами", props);

    return api
      .get(`/files?fileId=${fileId}&isForPreview=${isForPreview}`, {
        responseType: "blob",
      })
      .then((response) => {
        console.log("вызов в FileService ->getFile-> результат", response);
        if (isReturnRawData) {
          return response.data;
        }
        // Если мы конвертируем в PDF, то ожидаем что вернется чистый блоб для отображения в предпросмотре
        if (isForPreview) {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(
            fileURL,
            "Название вкладки",
            "width=1280,height=1024,top=100,left=100"
          );

          return null;
        }
        // иначе просто посылаем готовый файл на скачку
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}`);
        document.body.appendChild(link);
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        return null;
      });
  }

  static prepareFileListFromFormToSend(values) {
    const tempFileList = values.files?.fileList.filter((file) => !file.error);
    return tempFileList
      ? tempFileList.map((file) => ({
          ...file,
          // Вытаскиваем из респонса uuid, под которым сохранен файл
          uniq: file.response.savedFileName,
          lastModifiedDate: null,
          originFileObj: null,
          xhr: null,
        }))
      : [];
  }
}
