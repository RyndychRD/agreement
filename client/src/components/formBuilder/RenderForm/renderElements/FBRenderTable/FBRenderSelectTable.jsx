import { Select } from "antd";
import { useGetPositionsQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUsersQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
import { useGetDepartmentsQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";
import FBElementLayout from "../FBElementLayout";
import { userNameMask } from "../../../../../services/CommonFunctions";

/**
 *
 * @param {{elemNameForForm:<string>, form:<Form>,CurrentElement<json>,CurrentElementSelectValue<json> }} props
 * @example
 * CurrentElement:{
 * 					id:number,
 * 					elemNameForForm:string,
 * 					name:string,
 * 					select_value:{(table:string)|(select_id:[{value:string,label:string})}
 * 					}>
 * CurrentElementSelectValue:{[{value:string,label:string}]}
 */
function FBSelect(props) {
  const { elemNameForForm, form, CurrentElement, CurrentElementSelectValue } =
    props;
  const {
    setValueInSelectOnForm = (value) => {
      form.setFieldValue(elemNameForForm, value);
      form.setFieldValue(
        [elemNameForForm[0], "select_name"],
        CurrentElementSelectValue.find((el) => el.value === value).label
      );
    },
  } = props;
  const handlePaste = (e) => {
    e.preventDefault();
  };
  return (
    <FBElementLayout name={CurrentElement.name}>
      <Select
        showSearch
        onPaste={handlePaste}
        onDrop={handlePaste}
        optionFilterProp="children"
        onChange={setValueInSelectOnForm}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        id={elemNameForForm}
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
  const CurrentElementSelectValue = data.map((user) => {
    fio = userNameMask(user);
    return { value: user.id, label: fio };
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
