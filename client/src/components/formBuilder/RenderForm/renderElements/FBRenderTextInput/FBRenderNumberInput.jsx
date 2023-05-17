import { Form, InputNumber } from "antd";

/**
 * Рендерит поле для ввода числа
 * @param {*} props.elemNameForForm имя в Form
 * @param {*} props.formItemProps Дополнительные флаги в Form.Item
 * @param {*} props.CurrentElement Изначальное значение. Передается из словаря document_element_IO_dictionary
 * @returns
 */
export default function RenderNumberInput(props) {
  const { elemNameForForm, formItemProps, CurrentElement } = props;

  const percentageProps = CurrentElement.select_value?.isPercentage
    ? {
        addonAfter: "%",
        max: 100,
        min: 0,
      }
    : {};
  return (
    <Form.Item {...formItemProps}>
      <InputNumber
        id={elemNameForForm}
        formatter={(value) => value.replace(",", ".")}
        parser={(value) => value.replace(",", ".")}
        stringMode
        style={{ width: "175px" }}
        precision={2}
        {...percentageProps}
      />
    </Form.Item>
  );
}
