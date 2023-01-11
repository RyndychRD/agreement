import { Select } from "antd";
import FBElementLayout from "../FBElementLayout";
import { useGetDepartmentsQueryHook } from "../../../../core/redux/api/Globals/Catalogs/DepartamentApi";
import { useGetPositionsQueryHook } from "../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUsersQueryHook } from "../../../../core/redux/api/Globals/Catalogs/UserApi";

/**
 *
 * @param {{AreaType:<string>, form:<Form>,CurrentElement<json>,CurrentElementSelectValue<json> }} props
 * @example
 * CurrentElement:{
 * 					id:number,
 * 					key:string,
 * 					name:string,
 * 					select_value:{(table:string)|(select_id:[{value:string,label:string})}
 * 					}>
 * CurrentElementSelectValue:{[{value:string,label:string}]}
 */
function FBSelect(props) {
  const { AreaType, form, CurrentElement, CurrentElementSelectValue } = props;
  const {
    setValueInSelectOnForm = (value) => {
      console.log(
        `В выпадающем меню ${AreaType} было установленно значение =>`,
        value
      );
      form.setFieldValue(AreaType, value);
    },
  } = props;
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

function SelectTablePosition(props) {
  // Создаем переменную в которую будет хранится данные для выпадающих списков
  const { data = [] } = useGetPositionsQueryHook();
  const CurrentElementSelectValue = data.map((i) => ({
    value: i.id,
    label: i.name,
  }));

  return (
    <FBSelect
      CurrentElementSelectValue={CurrentElementSelectValue}
      {...props}
    />
  );
}

function SelectTableDepartments(props) {
  // Создаем переменную в которую будет хранится данные для выпадающих списков
  const { data = [] } = useGetDepartmentsQueryHook();

  const CurrentElementSelectValue = data.map((i) => ({
    value: i.id,
    label: i.name,
  }));
  return (
    <FBSelect
      CurrentElementSelectValue={CurrentElementSelectValue}
      {...props}
    />
  );
}

function SelectTableUsers(props) {
  // Создаем переменную в которую будет хранится данные для выпадающих списков
  const { data = [] } = useGetUsersQueryHook();
  // Переменная для манипуляции с фио
  let fio = "Фамилии еще не определенны";
  const CurrentElementSelectValue = data.map((i) => {
    fio = `${i.last_name} ${i.first_name}.${i.middle_name}.`;
    return { value: i.id, label: fio };
  });
  return (
    <FBSelect
      CurrentElementSelectValue={CurrentElementSelectValue}
      {...props}
    />
  );
}

export default function RenderSelectTable(props) {
  const { CurrentElement } = props;

  const CurrentElementSelectValueTable = CurrentElement?.select_value?.table;

  if (CurrentElementSelectValueTable) {
    switch (CurrentElementSelectValueTable) {
      case "position": {
        return <SelectTablePosition {...props} />;
      }

      case "departments": {
        return <SelectTableDepartments {...props} />;
      }
      case "users": {
        return <SelectTableUsers {...props} />;
      }
      default:
        throw new Error(
          "Не могу найти таблицу,",
          CurrentElementSelectValueTable
        );
    }
  }
}
