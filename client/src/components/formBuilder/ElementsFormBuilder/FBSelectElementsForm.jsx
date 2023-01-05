import { Form, Select } from "antd";

import {
	// eslint-disable-next-line no-unused-vars
	documentElementIODictionary,
} from "../FormBuilderInstanceForm";

export default function SelectElementForm({ restField, name }) {
	const options = documentElementIODictionary.map((i) => ({
		value: i.key,
		label: i.name
	}));

	return (
		<Form.Item
			{...restField}
			name={[name, "AreaType"]}
			rules={[
				{
					required: true,
					message: "Данные не внесены",
				},
			]}
		>
			<Select
				showSearch
				className="selectInput"
				placeholder="Выберите элемент"
				optionFilterProp="children"
				filterOption={(input, option) =>
					(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
				}
				filterSort={(optionA, optionB) =>
					(optionA?.label ?? "")
						.toLowerCase()
						.localeCompare((optionB?.label ?? "").toLowerCase())
				}
				options={options}
			/>
		</Form.Item>
	);
}
