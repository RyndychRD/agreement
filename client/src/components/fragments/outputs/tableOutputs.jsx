import { useGetPositionQueryHook } from "../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUserQueryHook } from "../../../core/redux/api/Globals/Catalogs/UserApi";
import { useGetDepartmentQueryHook } from "../../../core/redux/api/Globals/Catalogs/DepartamentApi";
import { TextOutputWithLabel } from "./textOutputs";

function TextValuePosition(value) {
  const { data, isLoading, isError } = useGetPositionQueryHook({ id: value });
  if (isLoading) return "Загрузка";
  if (isError) return "Ошибка";
  return data.name;
}
function TextValueUser(value) {
  const { data, isLoading, isError } = useGetUserQueryHook({ id: value });
  if (isLoading) return "Загрузка ";
  if (isError) return "Ошибка";
  return data.name;
}
function TextValueDepartment(value) {
  const { data, isLoading, isError } = useGetDepartmentQueryHook({ id: value });
  if (isLoading) return "Загрузка";
  if (isError) return "Ошибка";
  return data.name;
}

export default function TextValueOfTable(props) {
  const { value, table, keyIn, label } = props;
  let textValue;
  switch (table) {
    case "position":
      textValue = TextValuePosition(value);
      break;
    case "users":
      textValue = TextValueUser(value);
      break;
    case "departments":
      textValue = TextValueDepartment(value);
      break;
    default:
      textValue = "";
  }
  return <TextOutputWithLabel key={keyIn} text={textValue} label={label} />;
}
