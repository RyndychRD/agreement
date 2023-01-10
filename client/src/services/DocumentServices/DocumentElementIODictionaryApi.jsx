import { api } from "../../http/index";

export default class PositionService {
	static API_ROUTE = "/catalog/positions";

	static prepareForTable(data) {
		try {
			return data.map((el) => ({
				key: el.id,
				document_element_IO_dictionary_id: el.id,
				document_element_IO_dictionary_key: el.key,
				document_element_IO_dictionary_name: el.name,
				document_element_IO_dictionary_select_value: el.select_value,
			}));
		} catch (e) {
			console.log("Ошибка пред-обработки данных:", e);
			return e;
		}
	}

	static async getAll({ isAddForeignTables, isAddRights }) {
		console.log("вызов в PositionService -> Взять все записи");
		const response = await api.get(
			`${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}&isAddRights=${isAddRights}`
		);
		console.log(
			"вызов в PositionService -> Взять все записи -> результат",
			response
		);
		return response.data;
	}

	static async getOne({ id, isAddRights }) {
		console.log("вызов в PositionService -> Взять одну запись");
		const response = await api.get(
			`${this.API_ROUTE}?id=${id}&isAddRights=${isAddRights}`
		);
		console.log(
			"вызов в PositionService -> Взять одну запись -> результат",
			response
		);
		return response.data;
	}

	static async delete(values) {
		console.log("вызов в PositionService -> Удалить запись", values);
		const response = await api.delete(
			`${this.API_ROUTE}?id=${values.position_id}`
		);
		console.log(
			"вызов в PositionService -> Удалить запись -> результат",
			response
		);
		return response.data;
	}

	static async create(values) {
		console.log("вызов в PositionService -> Создать новую запись", values);
		const response = await api.post(`${this.API_ROUTE}`, values);
		console.log(
			"вызов в PositionService -> Создать новую запись -> результат",
			response
		);
		return response.data;
	}

	static async update(values) {
		console.log(
			"вызов в PositionService -> Изменить существующую запись",
			values
		);
		const response = await api.put(
			`${this.API_ROUTE}?id=${values.position_id}`,
			values
		);
		console.log(
			"вызов в PositionService -> Изменить существующую запись -> результат",
			response
		);
		return response.data;
	}
}
