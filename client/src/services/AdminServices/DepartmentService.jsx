import { api } from '../../http/index'

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class DepartmentService {
	static prepareForTable(data) {
		return data.map((el) => {
			return { key: el.id, department_id: el.id, department_name: el.name }
		})
	}

	static async getAll() {
		console.log('вызов в DepartamentService -> Взять все записи')
		const response = await api.get('/departments')
		console.log('вызов в DepartamentService -> результат', response)
		return response
	}
}
