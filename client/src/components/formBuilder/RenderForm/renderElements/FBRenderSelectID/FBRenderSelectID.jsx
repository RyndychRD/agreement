import { AutoComplete, Form } from "antd";

export default function RenderSelectID(props) {
  const { elemNameForForm, formItemProps, CurrentElement } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;

  return (
    <Form.Item {...formItemProps}>
      <AutoComplete
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        // defaultValue={defaultValue}
        // name={elemNameForForm}
        id={elemNameForForm}
        options={CurrentElementSelect}
      />
    </Form.Item>
  );
}
