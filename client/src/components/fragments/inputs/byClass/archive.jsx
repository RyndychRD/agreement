/* eslint-disable import/prefer-default-export */
import { useGetArchiveTypesQueryHook } from "../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";
import SelectInputFormItem from "../selectInputs";

/**
 * Селект бокс с возможностью выбора типа архива
 * @param {*} props.name
 * @param {*} props.title
 * @param {*} props.rules
 * @param {*} props.isModeMultiple Можно ли выбрать несколько типов архива?
 * @returns
 */
export function SelectArchiveTypesFormItem(props) {
  const {
    name = "archiveTypeId",
    title = "Тип архива",
    rules = [
      {
        required: true,
        message: "Выберите тип архива",
      },
    ],
    isModeMultiple = false,
  } = props;
  const {
    data: archiveTypes = [],
    isLoading: isLoadingArchiveTypes,
    isError: isErrorArchiveTypes,
  } = useGetArchiveTypesQueryHook();
  return (
    <SelectInputFormItem
      isModeMultiple={isModeMultiple}
      title={title}
      isLoading={isLoadingArchiveTypes}
      isError={isErrorArchiveTypes}
      name={name}
      options={archiveTypes}
      rules={rules}
    />
  );
}
