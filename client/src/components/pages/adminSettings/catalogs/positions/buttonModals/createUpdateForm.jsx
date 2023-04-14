import { useState, useEffect } from "react";
import { AForm } from "../../../../../adapter";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import {
  useGetDepartmentsQueryHook,
  useGetDepartmentQueryHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";
import { useGetRightsQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";

export default function CreateUpdateForm({ form }) {
  const {
    data: departments = {},
    isError: isErrorDepartments,
    isLoading: isLoadingDepartments,
  } = useGetDepartmentsQueryHook();
  const {
    data: rights = {},
    isError: isErrorRights,
    isLoading: isLoadingRights,
  } = useGetRightsQueryHook();

  // Используется как тригер для подтягивания новых прав по департаменту
  const [triggerGetDepartmentRights, setTriggerGetDepartmentRights] = useState({
    isStart: false,
  });
  // Сама функция подтягивания новых прав по департаменту
  const { data: result, isLoading: isLoadingDepartmentsRights } =
    useGetDepartmentQueryHook(triggerGetDepartmentRights);
  // Отрабатывает когда срабатывает триггер(чтобы отрабатывало с кешированными данными) и когда загружаются новые данные
  useEffect(
    () => {
      if (!isLoadingDepartmentsRights && triggerGetDepartmentRights.isStart) {
        form.setFieldsValue({
          inheritedRights: result?.rights?.map((el) => el.id),
        });
        setTriggerGetDepartmentRights({ isStart: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerGetDepartmentRights, isLoadingDepartmentsRights]
  );

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
        isShowSearch
        isLoading={isLoadingDepartments}
        isError={isErrorDepartments}
        name="departmentId"
        options={departments}
        onChange={(value) => {
          setTriggerGetDepartmentRights({
            id: value,
            isAddRights: true,
            isStart: true,
          });
        }}
        rules={[
          {
            required: true,
            message: "Выберите департамент",
          },
        ]}
      />
      <SelectInputFormItem
        title="Наследуемые права"
        isLoading={isLoadingRights || isLoadingDepartmentsRights}
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
