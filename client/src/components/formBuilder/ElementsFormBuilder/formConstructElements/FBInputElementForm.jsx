import { Form, Input } from "antd";

/**
 * Содержимое карточки добавления элемента в конструктор
 * @param {*} props.restField Дополнительные флаги для Form.Item
 * @param {*} props.name Название в Form
 */
export default function InputElementForm(props) {
  const { restField, name } = props;
  return (
    <Form.Item
      {...restField}
      name={[name, "label"]}
      rules={[
        {
          required: true,
          message: "Данные не внесены",
        },
      ]}
    >
      <Input placeholder="Наименование поля" />
    </Form.Item>
  );
}
