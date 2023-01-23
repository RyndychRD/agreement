import { Card, Form } from "antd";
import ReturnElement from "./FBReturnElement";
import "../FormBuilderStyle.css";

export default function FormBuilderDataComponent({ FormBuilderData, form }) {
  console.log("FormBuilderDataComponent=>", FormBuilderData);

  return FormBuilderData?.map((ComponentItem, index) => {
    const elemNameForForm = `${ComponentItem.key}/${index}`;
    return (
      <Form.Item
        name={elemNameForForm}
        key={elemNameForForm}
        rules={[
          {
            required: true,
            message: "Данные не внесены",
          },
        ]}
      >
        <Card
          size="small"
          title={`${ComponentItem.label}`}
          key={ComponentItem.label}
        >
          <ReturnElement
            ComponentNameForForm={elemNameForForm}
            ComponentKey={ComponentItem.key}
            form={form}
          />
        </Card>
      </Form.Item>
    );
  });
}
