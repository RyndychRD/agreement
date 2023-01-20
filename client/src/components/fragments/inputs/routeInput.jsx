import { Card, Form, Space } from "antd";
import { useGetPositionsQueryHook } from "../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUsersQueryHook } from "../../../core/redux/api/Globals/Catalogs/UserApi";
import ButtonAddComponentOnForm from "../../formBuilder/ElementsFormBuilder/FBButtonAddComponentOnForm";
import ButtonOnCarts from "../../formBuilder/ElementsFormBuilder/FBButtonOnCartsForm";
import SelectInputFormItem from "./selectInputs";
import { userNameMask } from "../../../services/CommonFunctions";
import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";

function getUserOptions(usersTemp, isUserRequired) {
  const result = isUserRequired ? [] : [{ id: -1, name: "По умолчанию" }];
  if (Object.keys(usersTemp).length === 0) return result;
  return result.concat(
    usersTemp?.map((user) => ({
      id: user.id,
      // prettier-ignore
      name: `${userNameMask(user)}, ${isUserRequired ? user.position_name : ""}`,
    }))
  );
}
/**
 * Ожидается, что этот фрагмент будет вызван внутри формы. Сама форма может иметь в себе заполненные поля
 * Если У формы заполнен массив routeSteps в формате
 * routeSteps=[{position_id:123, specified_signer_id:321}, {position_id:123, specified_signer_id:321}],
 * то эти шаги будут отображены как начальные значения
 * @returns
 */
export default function RouteFormList(props) {
  const { isLoading, isError, isIncludePositionSelect = true } = props;
  const isUserRequired = !isIncludePositionSelect;
  // prettier-ignore
  const {data: positions = {},isLoading:isLoadingPositions,isError:isErrorPositions} = useGetPositionsQueryHook({});
  // prettier-ignore
  const {data: users = {},isLoading:isLoadingUsers,isError:isErrorUsers} = useGetUsersQueryHook({isAddForeignTables:isUserRequired});

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <Form.List name="routeSteps">
      {(fields, { add, remove, move }) => (
        <>
          {fields.map(({ key, name }) => (
            <Space key={key} className="background-Cart" align="baseline">
              <Card
                size="small"
                className="w-100"
                title={`Шаг подписания №${name + 1}`}
                extra={ButtonOnCarts(remove, move, name, fields, key)}
              >
                {isIncludePositionSelect ? (
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
                ) : (
                  ""
                )}

                <SelectInputFormItem
                  title="Подписант"
                  isLoading={isLoadingUsers}
                  isError={isErrorUsers}
                  name={[name, `specified_signer_id`]}
                  options={getUserOptions(users, isUserRequired)}
                  rules={[
                    {
                      required: isUserRequired,
                      message: "Выберите должность",
                    },
                  ]}
                />
              </Card>
            </Space>
          ))}
          <ButtonAddComponentOnForm add={add} />
        </>
      )}
    </Form.List>
  );
}
