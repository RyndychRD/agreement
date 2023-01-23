import { Form, Space, Card } from "antd";
import ButtonAddComponentOnForm from "./formConstructElements/FBButtonAddComponentOnForm";
import InputElementForm from "./formConstructElements/FBInputElementForm";
import SelectElementForm from "./formConstructElements/FBSelectElementsForm";
import ButtonOnCarts from "./formConstructElements/FBButtonOnCartsForm";

export default function FBConstructForm() {
  return (
    <Form.List name="elementsOrder">
      {(fields, { add, remove, move }) => (
        <>
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
          <ButtonAddComponentOnForm add={add} />
        </>
      )}
    </Form.List>
  );
}
