import { DatePicker, Form } from "antd";

import locale from "antd/es/date-picker/locale/ru_RU";

/**
 * Рендерит поле для ввода даты
 * @param {*} props.elemNameForForm имя в Form
 * @param {*} props.formItemProps Дополнительные флаги в Form.Item
 * @returns
 */
export default function RenderDataPicker(props) {
  const { elemNameForForm, formItemProps } = props;

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
