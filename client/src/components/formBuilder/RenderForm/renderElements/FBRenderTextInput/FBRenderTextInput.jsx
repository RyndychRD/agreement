import { Form, Input } from "antd";

/**
 * Рендерит поле для ввода текста
 * @param {*} props.elemNameForForm имя в Form
 * @param {*} props.formItemProps Дополнительные флаги в Form.Item
 * @returns
 */
export default function RenderTextInput(props) {
  const { elemNameForForm, formItemProps } = props;

  return (
    <Form.Item {...formItemProps}>
      <Input id={elemNameForForm} type="text" />
    </Form.Item>
  );
}
