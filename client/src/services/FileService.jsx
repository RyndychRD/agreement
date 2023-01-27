/** @format */

import { api } from "../http/index";

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class FileService {
  static async getFile(props) {
    const { isTempFile, fileUuid, fileName, isConvertToPdf, isPDF } = props;
    console.log("вызов в FileService -> getFile c параметрами", props);

    const response = await api.get(
      `/files?isTempFile=${isTempFile}&fileUuid=${fileUuid}&isConvertToPdf=${isConvertToPdf}&isPDF=${isPDF}`,
      {
        responseType: "blob",
      }
    );

    console.log("вызов в FileService ->getFile-> результат", response);
    // Если мы конвертируем в PDF, то ожидаем что вернется чистый блоб для отображения в предпросмотре
    if (isConvertToPdf) return response.data;
    // иначе просто посылаем готовый файл на скачку
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}`);
    document.body.appendChild(link);
    link.click();
    console.log(`Файл "${fileName}" отправлен на загрузку пользователю`);

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    return null;
  }
}
