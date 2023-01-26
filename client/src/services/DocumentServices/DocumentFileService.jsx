import { api } from "../../http/index";

const API_ROUTE = "/documents/files";

export default class DocumentFileService {
  static async create(values) {
    // const config = {
    //   headers: {
    //     "Content-type":
    //       "'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
    //     Accept: "*/*",
    //   },
    // };
    const data = new FormData();
    data.append("file", values);
    data.append("name", "uploadedFile");
    console.log("вызов в DocumentFileService -> Создать новую запись", data);
    const response = await api.post(API_ROUTE, values);
    console.log(
      "вызов в DocumentFileService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }
}
