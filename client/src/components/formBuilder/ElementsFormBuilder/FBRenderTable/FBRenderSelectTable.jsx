import { Select } from "antd";
import FBElementLayout from "../FBElementLayout";
import { position, users } from "../../FormBuilderInstanceForm";
import { useGetDepartmentsQueryHook } from "../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

export default function RenderSelectTable(props) {
	const { AreaType, form, CurrentElement } = props;

	const CurrentElementSelectValueTable = CurrentElement?.select_value?.table;

	const setValueInSelectOnForm = (value) => {
		console.log(
			`В выпадающем меню ${AreaType} было установленно значение =>`,
			value
		);
		form.setFieldValue(AreaType, value);
	};

	/**
	 * При открытии форму подгружаем новые необходимые данные
	 */
	const {
		data = []
	} = useGetDepartmentsQueryHook();

	if (CurrentElementSelectValueTable) {
		let CurrentElementSelectValue = null;
		switch (CurrentElementSelectValueTable) {
			case "position":
				CurrentElementSelectValue = position.map((i) => ({
					value: i.name,
					label: i.name,
				}));
				break;
			case "departments": {
				console.log("console.log(dataDepartments)", data);
				CurrentElementSelectValue = data.map((i) => ({
					value: i.name,
					label: i.name,
				}));
				break;
			}
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
						(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
					}
					id={AreaType}
					options={CurrentElementSelectValue}
				/>
			</FBElementLayout>
		);
	}
}
