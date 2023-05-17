import { AutoComplete, Form } from "antd";

/**
 * Рендерит поле для ввода выборного значения. Можно ввести как одно из установленных значений, так и свое
 * @param {*} props.elemNameForForm имя в Form
 * @param {*} props.formItemProps Дополнительные флаги в Form.Item
 * @param {*} props.CurrentElement Текущее значение при существовании. Из него по пути CurrentElement.select_value.select_id достается реальное значение поля
 * @returns
 */
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
