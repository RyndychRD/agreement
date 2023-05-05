import { Form, Input } from "antd";

export default function RenderTextInput(props) {
  const { elemNameForForm, formItemProps } = props;

  return (
    <Form.Item {...formItemProps}>
      <Input id={elemNameForForm} type="text" />
    </Form.Item>
  );
}
