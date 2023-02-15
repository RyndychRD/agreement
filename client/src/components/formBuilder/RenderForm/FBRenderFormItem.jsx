import { Card, Form } from "antd";
import ReturnElement from "./FBReturnElement";
import "../FormBuilderStyle.css";

export default function FormBuilderDataComponent({ FormBuilderData, form }) {
  // console.log("FormBuilderDataComponent=>", FormBuilderData);

  return FormBuilderData?.map((ComponentItem, index) => {
    const elemNameForForm = [index, "value"];
    const keyIn = `${index}value`;
    const keyIn2 = `${index}value2`;
    const keyIn3 = `${index}value3`;
    const keyIn4 = `${index}value4`;
    return (
      <>
        <Form.Item
          key={keyIn}
          name={elemNameForForm}
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
        <Form.Item
          hidden
          name={[index, "label"]}
          initialValue={ComponentItem.label}
          key={keyIn2}
        />
        <Form.Item
          hidden
          name={[index, "key"]}
          initialValue={ComponentItem.key}
          key={keyIn3}
        />
        <Form.Item
          hidden
          name={[index, "select_name"]}
          initialValue={ComponentItem.key}
          key={keyIn4}
        />
      </>
    );
  });
}
