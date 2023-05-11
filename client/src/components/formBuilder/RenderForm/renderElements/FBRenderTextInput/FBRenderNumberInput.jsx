import { Form, InputNumber } from "antd";

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
