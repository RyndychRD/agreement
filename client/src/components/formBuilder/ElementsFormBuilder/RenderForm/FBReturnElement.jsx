import { Select, Input, DatePicker } from "antd";
import {
	documentElementIODictionary,
	documentTypeViews,
	position,
	departments,
	users,
} from "../../FormBuilderInstanceForm";
import FBElementLayout from "../FBElementLayout";
import EmailInput from "../FBEmailInput/FBEmailInput";

export default function ReturnElement(props) {
	const { id: key } = props;
	console.log("returnElement => ", key);

	const CurrentElement = documentElementIODictionary.filter(
		(i) => i.key === key
	)[0];

	console.log("returnElement => CurrentElement", CurrentElement);

	const DataKey = documentTypeViews[0].view.elements_order.find(
		(i) => i.key === key
	);

	console.log("returnElement => DataKey", DataKey);

	switch (DataKey.typeData) {
		case "text":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<Input id={key} type="text" />
				</FBElementLayout>
			);
		case "email":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<EmailInput id={key} />
				</FBElementLayout>
			);
		case "datePicker":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<DatePicker id={key} type="text" />
				</FBElementLayout>
			);
		case "phone": {
			const { Option } = Select;
			return (
				<FBElementLayout name={CurrentElement.name}>
					<Input.Group compact>
						<Select
							style={{
								width: "35%",
							}}
							defaultValue="Коды стран"
						>
							<Option value="+7">+7 Россия/Казахстан</Option>
							<Option value="+86">+86 Китай</Option>
							<Option value="+375">+375 Беларусь</Option>
							<Option value="+380">+380 Украина</Option>
						</Select>
						<Input
							style={{
								width: "35%",
							}}
							placeholder="(###)#######"
							defaultValue=""
						/>
						<Input
							style={{
								width: "30%",
							}}
							placeholder="Добавочный номер"
							defaultValue=""
						/>
					</Input.Group>
				</FBElementLayout>
			);
		}
		case "select_id": {
			const CurrentElementSelect = CurrentElement?.select_value?.select_id;
			console.log(CurrentElementSelect);
			return (
				<FBElementLayout name={CurrentElement.name}>
					<Select
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
						}
						id={key}
						options={CurrentElementSelect}
					/>
				</FBElementLayout>
			);
		}
		case "table": {
			const CurrentElementSelectValueTable =
				CurrentElement?.select_value?.table;
			if (CurrentElementSelectValueTable) {
				let CurrentElementSelectValue = null;
				switch (CurrentElementSelectValueTable) {
					case "position":
						CurrentElementSelectValue = position.map((i) => ({
							value: i.name,
							label: i.name,
						}));
						break;
					case "departments":
						CurrentElementSelectValue = departments.map((i) => ({
							value: i.name,
							label: i.name,
						}));
						break;
					case "users":
						CurrentElementSelectValue = users.map((i) => {
							const name = `${i.last_name} ${i.first_name}. ${i.middle_name}.`;
							return { value: name, label: name };
						});
						break;
					default:
						throw new Error(
							"Не могу найти таблицу,",
							CurrentElementSelectValueTable
						);
				}
				return (
					<FBElementLayout name={CurrentElement.name}>
						<Select
							showSearch
							optionFilterProp="children"
							filterOption={(input, option) =>
								(option?.label.toLowerCase() ?? "").includes(
									input.toLowerCase()
								)
							}
							id={key}
							options={CurrentElementSelectValue}
						/>
					</FBElementLayout>
				);
			}
			throw new Error("Не могу найти таблицу,", CurrentElementSelectValueTable);
		}

		default:
			return "Не найдено нечего !";
	}
}
