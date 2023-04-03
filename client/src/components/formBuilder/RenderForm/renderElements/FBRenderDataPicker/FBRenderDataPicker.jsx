import { DatePicker } from "antd";

export default function RenderDataPicker(props) {
  const { elemNameForForm, form } = props;

  const setValueInDatePickerOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value.format("YYYY-MM-DD"));
  };
  return (
    <DatePicker
      onChange={setValueInDatePickerOnForm}
      id={elemNameForForm}
      type="text"
      format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
    />
  );
}
