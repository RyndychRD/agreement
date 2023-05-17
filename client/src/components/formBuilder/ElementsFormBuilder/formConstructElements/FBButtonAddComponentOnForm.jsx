import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

/**
 * Добавляет кнопку добавления нового элемента. Используется в билдере
 * @param {*} props.add Функция, которая срабатывает при нажатии. Обычно функция add из Form.List
 */
export default function ButtonAddComponentOnForm(props) {
  const { add } = props;
  return (
    <Form.Item>
      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
        Добавить поле
      </Button>
    </Form.Item>
  );
}
