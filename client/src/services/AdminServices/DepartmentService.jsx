import { api } from "../../http/index"

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class DepartmentService {
   static prepareForTable(data) {
      return data.map((el) => {
         return { key: el.id, department_id: el.id, department_name: el.name }
      })
   }

   static async create(values) {
      console.log("вызов в DepartmentService -> Создать новую запись", values)
      const response = await api.post("/departments/create", values)
      console.log(
         "вызов в DepartamentService -> Создать новую запись -> результат",
         response
      )
      return response.data
   }

   static async update(values) {
      console.log(
         "вызов в DepartmentService -> Изменить существующую запись",
         values
      )
      const response = await api.post("/departments/update", values)
      console.log(
         "вызов в DepartamentService -> Изменить существующую запись -> результат",
         response
      )
      return response.data
   }

   static async delete(values) {
      console.log("вызов в DepartmentService -> Удалить запись", values)
      const response = await api.post("/departments/delete", values)
      console.log(
         "вызов в DepartamentService -> Удалить запись -> результат",
         response
      )
      return response.data
   }

   static async getAll() {
      console.log("вызов в DepartmentService -> Взять все записи")
      const response = await api.get("/departments")
      console.log(
         "вызов в DepartmentService -> Взять все записи -> результат",
         response
      )
      return response.data
   }
}
