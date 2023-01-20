import { useEffect, useState } from "react";
import { Form } from "antd";
import { useGetTypesQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/TypeApi";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import { useGetDocumentTypesViewsHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";

// Пока что мы можем только определить какой либо маршрут по одному из типов документа. Позже будет разнообразие в рамках одного типа
export default function CreateUpdateForm({ form, isAddUpdateOnlyFields }) {
  // prettier-ignore
  const {data: types = [], isError: isErrorTypes, isLoading: isLoadingTypes} = useGetTypesQueryHook();
  // prettier-ignore
  const {data: routes = [], isError:isErrorRoutes, isLoading:isLoadingRoutes} = useGetDocumentTypesViewsHook({});
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
      const filletedAvailableOptions = types?.filter(
        (type) => filledTypesIds.indexOf(type.id) === -1
      );
      setAvailableOptions(filletedAvailableOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes, types]);

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
    </Form>
  );
}
