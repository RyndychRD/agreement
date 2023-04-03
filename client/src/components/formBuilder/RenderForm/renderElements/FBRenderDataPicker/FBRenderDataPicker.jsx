import { DatePicker } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderDataPicker(props) {
  const { elemNameForForm, title, form } = props;

  const setValueInDatePickerOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value.format("YYYY-MM-DD"));
  };
  return (
    <FBElementLayout name={title}>
      <DatePicker
        onChange={setValueInDatePickerOnForm}
        id={elemNameForForm}
        type="text"
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </FBElementLayout>
  );
}
