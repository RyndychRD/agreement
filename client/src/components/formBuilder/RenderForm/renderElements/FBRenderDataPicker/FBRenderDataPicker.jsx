import { DatePicker, Form } from "antd";

import locale from "antd/es/date-picker/locale/ru_RU";

export default function RenderDataPicker(props) {
  const { elemNameForForm, formItemProps } = props;

  // const setValueInDatePickerOnForm = (value) => {
  //   form.setFieldValue(elemNameForForm, value.format("YYYY-MM-DD"));
  // };

  return (
    <Form.Item {...formItemProps}>
      <DatePicker
        id={elemNameForForm}
        // mode="date"
        // onChange={setValueInDatePickerOnForm}
        type="text"
        locale={locale}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}
