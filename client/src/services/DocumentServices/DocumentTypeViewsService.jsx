import { api } from "../../http/index";

export default class DocumentTypesViewsService {
	static API_ROUTE = "/catalog/documents/types-views";

	static prepareForTable(data) {
		try {
			return data.map((el) => ({
				key: el.id,
				document_types_views_id: el.id,
				document_types_views_document_type_id: el.document_type_id,
				document_types_views: el.view,
				document_types_view_print: el.view_print,
			}));
		} catch (e) {
			console.log("Ошибка пред-обработки данных:", e);
			return e;
		}
	}

	static async getAll() {
		console.log(
			"вызов в DocumentTypesViewsService -> Взять все записи"
		);
		const response = await api.get(`${this.API_ROUTE}`);
		console.log(
			"вызов в DocumentTypesViewsService -> Взять все записи -> результат",
			response
		);
		return response.data;
	}

	static async getOne({ id }) {
		console.log(
			"вызов в DocumentTypesViewsService -> Взять одну запись"
		);
		const response = await api.get(`${this.API_ROUTE}?id=${id}`);
		console.log(
			"вызов в DocumentTypesViewsService -> Взять одну запись -> результат",
			response
		);
		return response.data;
	}

	static async delete(values) {
		console.log(
			"вызов в DocumentTypesViewsService -> Удалить запись",
			values
		);
		const response = await api.delete(
			`${this.API_ROUTE}?id=${values.document_types_views_id}`
		);
		console.log(
			"вызов в DocumentTypesViewsService -> Удалить запись -> результат",
			response
		);
		return response.data;
	}

	static async create(values) {
		console.log(
			"вызов в DocumentTypesViewsService -> Создать новую запись",
			values
		);
		const response = await api.post(`${this.API_ROUTE}`, values);
		console.log(
			"вызов в DocumentTypesViewsService -> Создать новую запись -> результат",
			response
		);
		return response.data;
	}

	static async update(values) {
		console.log(
			"вызов в DocumentTypesViewsService -> Изменить существующую запись",
			values
		);
		const response = await api.put(
			`${this.API_ROUTE}?id=${values.document_types_views_id}`,
			values
		);
		console.log(
			"вызов в DocumentTypesViewsService -> Изменить существующую запись -> результат",
			response
		);
		return response.data;
	}
}
