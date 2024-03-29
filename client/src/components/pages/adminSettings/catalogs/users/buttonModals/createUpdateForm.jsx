import { useState, useEffect } from "react";
import { Form } from "antd";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import {
  useGetPositionsQueryHook,
  useGetPositionQueryHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import CheckboxInputFormItem from "../../../../../fragments/inputs/checkboxInputs";
import { useGetRightsQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";
import getUniqNotNullIds from "../../../../../../services/CommonFunctions";
import { useGetUsersQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/UserApi";

export default function CreateUpdateForm({
  form,
  rawData,
  isAddUpdateOnlyFields,
}) {
  const {
    data: positions = [],
    isLoading,
    isError,
  } = useGetPositionsQueryHook({ isAddForeignTables: true });

  let positionsWithDepartments = [];
  if (positions.length > 0) {
    positionsWithDepartments = positions.map((position) => ({
      ...position,
      name: `${position.name}, ${position.department_name}`,
    }));
  }

  const {
    data: users = {},
    isLoadingUsers,
    isErrorUsers,
  } = useGetUsersQueryHook({});

  const {
    data: rights = {},
    isError: isErrorRights,
    isLoading: isLoadingRights,
  } = useGetRightsQueryHook();

  let userLogins = [];
  if (!isLoadingUsers && !isErrorUsers && users.length > 0) {
    userLogins = users.map((user) => user.login);
  }

  const checkbox = isAddUpdateOnlyFields ? (
    <CheckboxInputFormItem title="Заблокирован?" name="isDisabled" />
  ) : (
    ""
  );

  // Используется как тригер для подтягивания новых прав по департаменту
  const [triggerGetPositionRights, setTriggerGetPositionRights] = useState({
    isStart: false,
  });
  // Сама функция подтягивания новых прав по департаменту
  const { data: result, isLoading: isLoadingPositionRights } =
    useGetPositionQueryHook(triggerGetPositionRights);
  // Отрабатывает когда срабатывает триггер(чтобы отрабатывало с кешированными данными) и когда загружаются новые данные
  useEffect(
    () => {
      if (!isLoadingPositionRights && triggerGetPositionRights.isStart) {
        form.setFieldsValue({
          inheritedRights: getUniqNotNullIds(
            result?.rights.concat(result?.rights_inherited)
          ),
        });
        setTriggerGetPositionRights({ isStart: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerGetPositionRights, isLoadingPositionRights]
  );

  return (
    <Form form={form}>
      <TextInputFormItem
        title="Логин пользователя"
        name="newLogin"
        rules={[
          {
            required: true,
            message: "Введите логин пользователя",
          },
          () => ({
            validator(_, value) {
              const trimValue = value.trim();
              // Если это не тот логин, который уже был и он встречается среди других логинов, выводим ошибку
              if (
                trimValue !== rawData?.login &&
                userLogins.find((login) => login === trimValue)
              ) {
                return Promise.reject(new Error("Такой логин занят"));
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
      <TextInputFormItem
        title="Пароль пользователя(он будет необратимо зашифрован)"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Введите пароль пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Email пользователя"
        name="newEmail"
        rules={[]}
      />
      <TextInputFormItem
        title="Фамилия пользователя"
        name="newLastName"
        rules={[
          {
            required: true,
            message: "Введите фамилию пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Имя пользователя"
        name="newFirstName"
        rules={[
          {
            required: true,
            message: "Введите имя пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Отчество пользователя"
        name="newMiddleName"
        rules={[]}
      />

      <SelectInputFormItem
        title="Должность"
        isLoading={isLoading}
        isError={isError}
        name="positionId"
        options={positionsWithDepartments}
        isShowSearch
        rules={[
          {
            required: true,
            message: "Выберите должность",
          },
        ]}
        // При смене должности наследуемые права должны поменяться
        onChange={(value) => {
          setTriggerGetPositionRights({
            id: value,
            isAddRights: true,
            isStart: true,
          });
        }}
      />
      {checkbox}
      <SelectInputFormItem
        title="Наследуемые права"
        isLoading={isLoadingRights || isLoadingPositionRights}
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
    </Form>
  );
}
