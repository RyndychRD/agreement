import { useEffect, useState } from "react";
import { Form } from "antd";
import { useGetTypesQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import { AForm, ASpace, ACard } from "../../../../../adapter";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import { useGetRoutesQueryHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import ButtonAddComponentOnForm from "../../../../../formBuilder/ElementsFormBuilder/FBButtonAddComponentOnForm";
import ButtonOnCarts from "../../../../../formBuilder/ElementsFormBuilder/FBButtonOnCartsForm";
// import InputElementForm from "../../../../../formBuilder/ElementsFormBuilder/FBInputElementForm";
// import SelectElementForm from "../../../../../formBuilder/ElementsFormBuilder/FBSelectElementsForm";

// Пока что мы можем только определить какой либо маршрут по одному из типов документа. Позже будет разнообразие в рамках одного типа
export default function CreateUpdateForm({ form }) {
  // const { data: types = [], isError, isLoading } = useGetTypesQueryHook();
  // // prettier-ignore
  // const {data: routes = [], isErrorRoutes, isLoadingRoutes} = useGetRoutesQueryHook();
  // const [availableOptions, setAvailableOptions] = useState(types);
  // // После того как загрузка закончена, мы удаляем те маршруты, которые уже заполнены
  // useEffect(() => {
  //   if (!isLoadingRoutes && !isErrorRoutes && !isError && !isLoading) {
  //     const filledTypesIds = routes?.map((route) => route.document_type_id);
  //     const tempAvailableOptions = types?.filter(
  //       (type) => filledTypesIds.indexOf(type.id) === -1
  //     );
  //     setAvailableOptions(tempAvailableOptions);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [routes, types]);
  return (
    <Form name="dynamic_form_nest_item">
      {/* <SelectInputFormItem
        title="Тип документа"
        isLoading={isLoading || isLoadingRoutes}
        isError={isError || isErrorRoutes}
        name="typeId"
        options={availableOptions}
        rules={[
          {
            required: true,
            message: "Выберите тип документа",
          },
        ]}
      /> */}
      <Form.List name="FormBuilder">
        {(fields, { add, remove, move }) => (
          <>
            <ButtonAddComponentOnForm add={add} />
            {fields.map(({ key, name, ...restField }) => (
              <ASpace key={key} className="background-Cart" align="baseline">
                <ACard
                  size="small"
                  title={`Порядок в списке №${name} ${JSON.stringify(
                    restField
                  )}`}
                  extra={ButtonOnCarts(remove, move, name, fields, key)}
                >
                  <div>Я элемент</div>
                </ACard>
              </ASpace>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
}
