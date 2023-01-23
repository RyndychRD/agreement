import { Form, Space, Card } from "antd";
import ButtonAddComponentOnForm from "./formConstructElements/FBButtonAddComponentOnForm";
import InputElementForm from "./formConstructElements/FBInputElementForm";
import SelectElementForm from "./formConstructElements/FBSelectElementsForm";
import ButtonOnCarts from "./formConstructElements/FBButtonOnCartsForm";

export default function FBConstructForm() {
  // const dispatch = useCustomDispatch();
  // const onFinish = useCallback(
  //   (value) => {
  //     if (value) {
  //       dispatch({ type: "SaveFormButton", FormBuilderData: value });
  //       console.log("onFinish => useCallback => value", value);
  //     }
  //   },
  //   [dispatch]
  // );

  return (
    <Form.List name="FormBuilder">
      {(fields, { add, remove, move }) => (
        <>
          <ButtonAddComponentOnForm add={add} />
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} className="background-Cart" align="baseline">
              <Card
                size="small"
                title={`Порядок в списке №${name + 1}`}
                extra={ButtonOnCarts(remove, move, name, fields, key)}
              >
                <InputElementForm restField={restField} name={name} />
                <SelectElementForm restField={restField} name={name} />
              </Card>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
}
