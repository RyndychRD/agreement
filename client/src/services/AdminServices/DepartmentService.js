import { api } from "../../http/index";

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class DepartmentService {
	static async getAll() {
		console.log("вызов в DepartamentService -> Взять все записи");
		const response = await api.get("/departments");
		console.log("вызов в DepartamentService -> результат", response);
		return response;
	}
}
