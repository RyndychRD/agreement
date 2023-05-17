import { Col, Form, Row } from "antd";
import TextInputFormItem, {
  LargeTextInputFormItem,
  NumberInputFormItem,
} from "../../../../inputs/textInputs";

function calculateWithNDS(sumNoNDS, NDS) {
  if (parseInt(sumNoNDS, 10) <= 0 || !sumNoNDS) return 0;
  return parseInt(sumNoNDS, 10) + (sumNoNDS / 100) * NDS;
}

/**
 * Поля для заполнения/отображения для поручений от Михеевой. Тип 2
 * @param {*} props.form
 * @param {*} props.isDisabled
 * @returns
 */
export default function DocumentTaskSecondListZakupTRU(props) {
  const { form, isDisabled = false } = props;
  const budgetSumNoNDS = Form.useWatch("budgetSumNoNDS", form);
  const contractSumNoNDS = Form.useWatch("contractSumNoNDS", form);
  const currentNDS = Form.useWatch("currentNDS", form);

  return (
    <>
      <TextInputFormItem
        disabled={isDisabled}
        title="Полное наименование статьи в бюджете"
        name="fullNameOfTheItemInBudget"
        rules={[
          {
            required: true,
            message: "Необходимо для заполнения!",
          },
        ]}
      />
      <Row gutter={2}>
        <Col span={10}>
          <NumberInputFormItem
            disabled={isDisabled}
            title="Сумма по бюджету, тыс. тенге (Без НДС)"
            name="budgetSumNoNDS"
            onBlur={() => {
              form.setFieldValue(
                "budgetSumWithNDS",
                calculateWithNDS(budgetSumNoNDS, currentNDS)
              );
            }}
            value={0}
            formatter={(value) => value.replace(",", ".")}
            rules={[
              {
                required: true,
                message: "Необходимо для заполнения!",
              },
            ]}
          />
        </Col>
        {/* Считается автоматически при потере фокуса на предыдущем поле. Все еще возможно изменить самостоятельно */}
        <Col span={10}>
          <NumberInputFormItem
            disabled={isDisabled}
            title="Сумма по бюджету, тыс. тенге (C НДС)"
            name="budgetSumWithNDS"
            value={0}
            formatter={(value) => value.replace(",", ".")}
            rules={[
              {
                required: true,
                message: "Необходимо для заполнения!",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={2}>
        <Col span={10}>
          <NumberInputFormItem
            disabled={isDisabled}
            title="Сумма по договору, тыс. тенге (Без НДС)"
            name="contractSumNoNDS"
            value={0}
            onBlur={() => {
              form.setFieldValue(
                "contractSumWithNDS",
                calculateWithNDS(contractSumNoNDS, currentNDS)
              );
            }}
            formatter={(value) => value.replace(",", ".")}
            rules={[
              {
                required: true,
                message: "Необходимо для заполнения!",
              },
            ]}
          />
        </Col>
        {/* Считается автоматически при потере фокуса на предыдущем поле. Все еще возможно изменить самостоятельно */}
        <Col span={10}>
          <NumberInputFormItem
            disabled={isDisabled}
            title="Сумма по договору, тыс. тенге (C НДС)"
            name="contractSumWithNDS"
            value={0}
            formatter={(value) => value.replace(",", ".")}
            rules={[
              {
                required: true,
                message: "Необходимо для заполнения!",
              },
            ]}
          />
        </Col>
      </Row>
      <NumberInputFormItem
        disabled={isDisabled}
        title="Текущий НДС"
        name="currentNDS"
        addonAfter="%"
        max={100}
        min={0}
        onBlur={() => {
          form.setFieldValue(
            "budgetSumWithNDS",
            calculateWithNDS(budgetSumNoNDS, currentNDS)
          );
          form.setFieldValue(
            "contractSumWithNDS",
            calculateWithNDS(contractSumNoNDS, currentNDS)
          );
        }}
        rules={[
          {
            required: true,
            message: "Необходимо для заполнения!",
          },
        ]}
      />
      <NumberInputFormItem
        disabled={isDisabled}
        title="Курсы валюты на дату(тенге/рубли РФ, доллары США и тд.)"
        value={0}
        formatter={(value) => value.replace(",", ".")}
        name="exchangeRates"
        rules={[]}
      />
      <LargeTextInputFormItem
        disabled={isDisabled}
        title="Примечание"
        name="remark"
        value=""
        rules={[]}
      />
    </>
  );
}
