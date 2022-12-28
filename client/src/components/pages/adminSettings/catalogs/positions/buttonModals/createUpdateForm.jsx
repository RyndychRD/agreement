import { AForm } from "../../../../../adapter";
import CheckboxInputFormItem from "../../../../../fragments/inputs/checkboxInputs";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import { useGetDepartmentsQuery } from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";
import { useGetRightsQuery } from "../../../../../../core/redux/api/AdminSettings/Catalogs/RightApi";

export default function CreateUpdateForm({ form }) {
  const {
    data: departments = {},
    isError: isErrorDepartments,
    isLoading: isLoadingDepartments,
  } = useGetDepartmentsQuery();
  const {
    data: rights = {},
    isError: isErrorRights,
    isLoading: isLoadingRights,
  } = useGetRightsQuery();

  return (
    <AForm form={form}>
      <TextInputFormItem
        title="Наименование должности"
        name="newPositionName"
        rules={[
          {
            required: true,
            message: "Введите название должности",
          },
        ]}
      />
      <SelectInputFormItem
        title="Департамент"
        isLoading={isLoadingDepartments}
        isError={isErrorDepartments}
        name="departmentId"
        options={departments}
        rules={[
          {
            required: true,
            message: "Выберите департамент",
          },
        ]}
      />
      <CheckboxInputFormItem
        title="Имеет право подписания документов?"
        name="isSigner"
      />
      <SelectInputFormItem
        title="Наследуемые права"
        isLoading={isLoadingRights}
        isError={isErrorRights}
        isModeMultiple
        name="inheritedRights"
        options={rights}
        rules={[]}
        disabled
      />
      <SelectInputFormItem
        title="Права"
        isLoading={isLoadingRights}
        isError={isErrorRights}
        isModeMultiple
        name="rightIds"
        options={rights}
        rules={[]}
      />
    </AForm>
  );
}
