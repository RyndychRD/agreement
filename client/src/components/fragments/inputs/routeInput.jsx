import { Card, Form, Space } from "antd";
import { useGetPositionsQueryHook } from "../../../core/redux/api/Globals/Catalogs/PositionsApi";
import { useGetUsersQueryHook } from "../../../core/redux/api/Globals/Catalogs/UserApi";
import ButtonAddComponentOnForm from "../../formBuilder/ElementsFormBuilder/formConstructElements/FBButtonAddComponentOnForm";
import ButtonOnCarts from "../../formBuilder/ElementsFormBuilder/formConstructElements/FBButtonOnCartsForm";
import SelectInputFormItem from "./selectInputs";
import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";
import { getUserNameAndPositionOptionsForSelect } from "../../../services/CommonFunctions";

/**
 * Ожидается, что этот фрагмент будет вызван внутри формы. Сама форма может иметь в себе заполненные поля
 * Если У формы заполнен массив routeSteps в формате
 * routeSteps=[{position_id:123, specified_signer_id:321}, {position_id:123, specified_signer_id:321}],
 * то эти шаги будут отображены как начальные значения
 * @returns
 */
export default function RouteFormList(props) {
  const {
    isLoading = false,
    isError = false,
    isIncludePositionSelect = true,
    // Так как этот компонент используется чтобы отображать список шагов с некоторыми пропущенными в начале шагами, то для правильного отображения нужно это значение
    startStepNumber = 0,
  } = props;
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
                title={`Шаг подписания №${name + 1 + startStepNumber}`}
                extra={ButtonOnCarts(remove, move, name, fields, key)}
              >
                {isIncludePositionSelect ? (
                  <SelectInputFormItem
                    title="Должность"
                    isLoading={isLoadingPositions}
                    isError={isErrorPositions}
                    name={[name, `position`, "id"]}
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
                  options={getUserNameAndPositionOptionsForSelect(
                    users,
                    isUserRequired
                  )}
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
