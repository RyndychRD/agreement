import { Select, Input, DatePicker } from "antd";
import { useRef } from "react";
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
	const { AreaType, form } = props;
	console.log("returnElement => ", AreaType);

	const CurrentElement = documentElementIODictionary.filter(
		(i) => i.key === AreaType
	)[0];

	console.log("returnElement => CurrentElement", CurrentElement);

	const DataKey = documentTypeViews[0].view.elements_order.find(
		(i) => i.key === AreaType
	);

	console.log("returnElement => DataKey", DataKey);

	const PhoneBodyRef = useRef("");
	const CustomPhoneCodeCountryRef = useRef("");
	const CustomPhoneBodyRef = useRef("");
	const CustomPhoneAdditionalNumberRef = useRef("");

	function setPhoneBodyRef(value) {
		console.log(
			`В выпадающем меню ${AreaType} было установленно значение =>`,
			value
		);
		PhoneBodyRef.current = `${
			CustomPhoneCodeCountryRef.current ? CustomPhoneCodeCountryRef.current : ""
		}${CustomPhoneBodyRef.current ? CustomPhoneBodyRef.current : ""}${
			CustomPhoneAdditionalNumberRef.current
				? CustomPhoneAdditionalNumberRef.current
				: ""
		}`;
		console.log(PhoneBodyRef.current);
		form.setFieldValue(AreaType, PhoneBodyRef.current);
	}
	const setValueInCustomPhoneCodeCountryOnForm = (value) => {
		CustomPhoneCodeCountryRef.current = value;
		setPhoneBodyRef(value);
	};
	const setValueInCustomPhoneBodyOnForm = (e) => {
		e.stopPropagation();
		const { value } = e.target;
		CustomPhoneBodyRef.current = value;
		setPhoneBodyRef(value);
	};
	const setValueInCustomPhoneAdditionalOnForm = (e) => {
		e.stopPropagation();
		const { value } = e.target;
		CustomPhoneAdditionalNumberRef.current = ` Добавочный номер ${value} `;
		setPhoneBodyRef(value);
	};

	const setValueInSelectOnForm = (value) => {
		console.log(
			`В выпадающем меню ${AreaType} было установленно значение =>`,
			value
		);
		form.setFieldValue(AreaType, value);
	};

	const setValueInDatePickerOnForm = (value) => {
		console.log(
			`В выпадающем меню ${AreaType} было установленно значение =>`,
			value
		);
		form.setFieldValue(AreaType, value);
	};

	switch (DataKey.typeData) {
		case "text":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<Input id={AreaType} type="text" />
				</FBElementLayout>
			);
		case "email":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<EmailInput id={AreaType} />
				</FBElementLayout>
			);
		case "datePicker":
			return (
				<FBElementLayout name={CurrentElement.name}>
					<DatePicker
						onChange={setValueInDatePickerOnForm}
						id={AreaType}
						type="text"
						format={(value) => `Выбранная дата: ${value.format("DD/MM/YY")}`}
					/>
				</FBElementLayout>
			);
		case "phone": {
			const { Option } = Select;
			return (
				<FBElementLayout name={CurrentElement.name}>
					<Input.Group compact>
						<Select
							onChange={setValueInCustomPhoneCodeCountryOnForm}
							style={{
								width: "35%",
							}}
							defaultValue="Коды стран"
						>
							<Option value="">Не указан</Option>
							<Option value="+7">+7 Россия/Казахстан</Option>
							<Option value="+86">+86 Китай</Option>
							<Option value="+375">+375 Беларусь</Option>
							<Option value="+380">+380 Украина</Option>
						</Select>
						<Input
							onChange={setValueInCustomPhoneBodyOnForm}
							style={{
								width: "35%",
							}}
							placeholder="(###)#######"
							defaultValue=""
						/>
						<Input
							onChange={setValueInCustomPhoneAdditionalOnForm}
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
						onChange={setValueInSelectOnForm}
						filterOption={(input, option) =>
							(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
						}
						id={AreaType}
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
							onChange={setValueInSelectOnForm}
							filterOption={(input, option) =>
								(option?.label.toLowerCase() ?? "").includes(
									input.toLowerCase()
								)
							}
							id={AreaType}
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
