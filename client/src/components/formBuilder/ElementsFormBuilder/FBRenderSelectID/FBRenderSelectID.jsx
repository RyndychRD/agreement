import { Select } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderSelectID(props) {
  const { AreaType, form, CurrentElement } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;
  const setValueInSelectOnForm = (value) => {
    console.log(
      `В выпадающем меню ${AreaType} было установленно значение =>`,
      value
    );
    form.setFieldValue(AreaType, value);
  };
  return (
    <FBElementLayout name={CurrentElement.name}>
      <Select
        showSearch
        optionFilterProp="children"
        onChange={setValueInSelectOnForm}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        id={AreaType}
        options={CurrentElementSelect}
      />
    </FBElementLayout>
  );
}
