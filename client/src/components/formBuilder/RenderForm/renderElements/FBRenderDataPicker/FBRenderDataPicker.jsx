import { DatePicker } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderDataPicker(props) {
  const { AreaType, form, CurrentElement } = props;

  const setValueInDatePickerOnForm = (value) => {
    console.log(
      `В выпадающем меню ${AreaType} было установленно значение =>`,
      value
    );
    form.setFieldValue(AreaType, value);
  };
  return (
    <FBElementLayout name={CurrentElement.name}>
      <DatePicker
        onChange={setValueInDatePickerOnForm}
        id={AreaType}
        type="text"
        format={(value) => `Выбранная дата: ${value.format("DD/MM/YY")}`}
      />
    </FBElementLayout>
  );
}
