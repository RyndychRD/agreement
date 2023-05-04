import { DatePicker } from "antd";
import moment from "moment";

export default function RenderDataPicker(props) {
  const { elemNameForForm, defaultValue, form } = props;

  const setValueInDatePickerOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value.format("YYYY-MM-DD"));
  };
  if (defaultValue) {
    setValueInDatePickerOnForm(moment(defaultValue));
  }
  return (
    <DatePicker
      onChange={setValueInDatePickerOnForm}
      id={elemNameForForm}
      defaultValue={defaultValue ? moment(defaultValue) : undefined}
      type="text"
      format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
    />
  );
}
