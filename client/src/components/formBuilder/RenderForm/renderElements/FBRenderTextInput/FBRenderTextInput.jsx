import { Form, Input } from "antd";

export default function RenderTextInput(props) {
  const { elemNameForForm, formItemProps, form } = props;

  return (
    <Form.Item {...formItemProps}>
      <Input
        id={elemNameForForm}
        type="text"
        onChange={(e) => {
          form.setFieldValue(elemNameForForm, e.target.value);
        }}
      />
    </Form.Item>
  );
}
