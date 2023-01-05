import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ButtonAddComponentOnForm({ add }) {
  return (
    <Form.Item>
      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
        Добавить поле
      </Button>
    </Form.Item>
  );
}
