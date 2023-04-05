import { Form } from "antd";
import ReturnElement from "./FBReturnElement";
import "../FormBuilderStyle.css";

export default function FormBuilderDataComponent({ FormBuilderData, form }) {
  return FormBuilderData?.map((ComponentItem, index) => {
    const elemNameForForm = [index, "value"];
    const keyIn = `${index}value`;
    const keyIn2 = `${index}value2`;
    const keyIn3 = `${index}value3`;
    const keyIn4 = `${index}value4`;
    const rules = [];
    if (ComponentItem.isFieldRequired)
      rules.push({
        required: true,
        message: "Данные не внесены",
      });
    return (
      <>
        <Form.Item
          key={keyIn}
          name={elemNameForForm}
          label={ComponentItem.label}
          labelCol={{ span: 24 }}
          rules={rules}
        >
          <ReturnElement
            ComponentNameForForm={elemNameForForm}
            ComponentKey={ComponentItem.key}
            title={ComponentItem.label}
            form={form}
          />
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
