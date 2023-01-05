import { api } from "../../http/index";

export default class DocumentService {
	static API_ROUTE = "/catalog/documents";

	/** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
	static prepareForTable(data) {
		try {
			return data.map((el) => ({
				key: el.id,
				document_id: el.id,
				document_status_id: el.document_status_id,
				document_type_id: el.document_type_id,
				creator_id: el.creator_id,
				name: el.name,
				created_at: el.created_at,
				updated_at: el.updated_at,
				finished_at: el.finished_at
			}));
		} catch (e) {
			console.log("Ошибка пред-обработки данных:", e);
			return e;
		}
	}

	static async create(values) {
		console.log("вызов в DocumentService -> Создать новую запись", values);
		const response = await api.post(`${this.API_ROUTE}`, values);
		console.log(
			"вызов в DocumentService -> Создать новую запись -> результат",
			response
		);
		return response.data;
	}

	static async update(values) {
		console.log(
			"вызов в DocumentService -> Изменить существующую запись",
			values
		);
		const response = await api.put(
			`${this.API_ROUTE}?id=${values.documents_id}`,
			values
		);
		console.log(
			"вызов в DocumentService -> Изменить существующую запись -> результат",
			response
		);
		return response.data;
	}

	static async delete(values) {
		console.log("вызов в DocumentService -> Удалить запись", values);
		const response = await api.delete(
			`${this.API_ROUTE}?id=${values.documents_id}`
		);
		console.log(
			"вызов в DocumentService -> Удалить запись -> результат",
			response
		);
		return response.data;
	}

	static async getAll() {
		console.log("вызов в DocumentService -> Взять все записи");
		const response = await api.get(`${this.API_ROUTE}`);
		console.log(
			"вызов в DocumentService -> Взять все записи -> результат",
			response
		);
		return response.data;
	}

	static async getOne(id) {
		console.log("вызов в DocumentService -> Взять одну записи");
		const response = await api.get(`${this.API_ROUTE}?id=${id}`);
		console.log(
			"вызов в DocumentService -> Взять одну запись -> результат",
			response
		);
		return response.data;
	}
}