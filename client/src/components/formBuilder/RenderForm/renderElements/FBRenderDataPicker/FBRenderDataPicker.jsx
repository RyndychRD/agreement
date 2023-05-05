import { DatePicker, Form } from "antd";

import locale from "antd/es/date-picker/locale/ru_RU";

export default function RenderDataPicker(props) {
  const { elemNameForForm, formItemProps, form } = props;

  return (
    <Form.Item {...formItemProps}>
      <DatePicker
        id={elemNameForForm}
        locale={locale}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}
