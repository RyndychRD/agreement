import { api } from '../../http/index'

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class DepartmentService {
	static prepareForTable(data) {
		return data.map((el) => {
			return { key: el.id, department_id: el.id, department_name: el.name }
		})
	}

	static async create(values) {
		console.log('вызов в DepartmentService -> Создать новую запись')
		console.log(values)
		const response = await api.post('/departments/create', values)
		console.log('вызов в DepartamentService -> результат', response)
		return response
	}

	static async getAll() {
		console.log('вызов в DepartmentService -> Взять все записи')
		const response = await api.get('/departments')
		console.log('вызов в DepartmentService -> результат', response)
		return response.data
	}
}
