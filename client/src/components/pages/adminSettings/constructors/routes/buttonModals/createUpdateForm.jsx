import { useEffect, useState } from "react";
import { Card, Form, Space } from "antd";
import { useGetTypesQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import { useGetRoutesQueryHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import ButtonAddComponentOnForm from "../../../../../formBuilder/ElementsFormBuilder/FBButtonAddComponentOnForm";
import ButtonOnCarts from "../../../../../formBuilder/ElementsFormBuilder/FBButtonOnCartsForm";
import { useGetPositionsQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUsersQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/UserApi";
import { userNameMask } from "../../../../../../services/CommonFunctions";

// Пока что мы можем только определить какой либо маршрут по одному из типов документа. Позже будет разнообразие в рамках одного типа
export default function CreateUpdateForm({ form, isAddUpdateOnlyFields }) {
  // prettier-ignore
  const {data: types = [], isError: isErrorTypes, isLoading: isLoadingTypes} = useGetTypesQueryHook();
  // prettier-ignore
  const {data: routes = [], isError:isErrorRoutes, isLoading:isLoadingRoutes} = useGetRoutesQueryHook();
  const [availableOptions, setAvailableOptions] = useState(types);
  // После того как загрузка закончена, мы удаляем те маршруты, которые уже заполнены
  useEffect(() => {
    if (
      !isLoadingRoutes &&
      !isErrorRoutes &&
      !isErrorTypes &&
      !isLoadingTypes
    ) {
      const filledTypesIds = routes?.map((route) => route.document_type_id);
      const tempAvailableOptions = types?.filter(
        (type) => filledTypesIds.indexOf(type.id) === -1
      );
      setAvailableOptions(tempAvailableOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes, types]);

  // prettier-ignore
  const {data: positions = {},isLoading:isLoadingPositions,isError:isErrorPositions} = useGetPositionsQueryHook({});
  // prettier-ignore
  const {data: users = {},isLoading:isLoadingUsers,isError:isErrorUsers} = useGetUsersQueryHook({});

  return (
    <Form form={form} name="dynamic_form_nest_item" autoComplete="off">
      <SelectInputFormItem
        title="Тип документа"
        isLoading={isLoadingTypes || isLoadingRoutes}
        isError={isErrorTypes || isErrorRoutes}
        name="typeId"
        options={availableOptions}
        disabled={isAddUpdateOnlyFields}
        rules={[
          {
            required: true,
            message: "Выберите тип документа",
          },
        ]}
      />
      <Form.List name="routeSteps">
        {(fields, { add, remove, move }) => (
          <>
            <ButtonAddComponentOnForm add={add} />
            {fields.map(({ key, name }) => (
              <Space key={key} className="background-Cart" align="baseline">
                <Card
                  size="small"
                  className="w-100"
                  title={`Шаг подписания №${name + 1}`}
                  extra={ButtonOnCarts(remove, move, name, fields, key)}
                >
                  <SelectInputFormItem
                    title="Должность"
                    isLoading={isLoadingPositions}
                    isError={isErrorPositions}
                    name={[name, `position_id`]}
                    options={positions}
                    rules={[
                      {
                        required: true,
                        message: "Выберите должность",
                      },
                    ]}
                  />
                  <SelectInputFormItem
                    title="Подписант"
                    isLoading={isLoadingUsers}
                    isError={isErrorUsers}
                    name={[name, `specified_signer_id`]}
                    options={[{ id: -1, name: "По умолчанию" }].concat(
                      users.map((user) => ({
                        id: user.id,
                        name: userNameMask(user),
                      }))
                    )}
                    rules={[]}
                  />
                </Card>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
}
