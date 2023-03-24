import { Col, Form, Row } from "antd";
import TextInputFormItem, {
  LargeTextInputFormItem,
  IntegerInputFormItem,
} from "../../../../inputs/textInputs";

function calculateWithNDS(sumNoNDS, NDS) {
  return parseInt(sumNoNDS, 10) + (sumNoNDS / 100) * NDS;
}

export default function DocumentTaskSecondListZakupTRU(props) {
  const { form } = props;
  const budgetSumNoNDS = Form.useWatch("budgetSumNoNDS", form);
  const contractSumNoNDS = Form.useWatch("contractSumNoNDS", form);
  const currentNDS = Form.useWatch("currentNDS", form);
  return (
    <>
      <TextInputFormItem
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
          <IntegerInputFormItem
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
        <Col span={10}>
          <IntegerInputFormItem
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
          <IntegerInputFormItem
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
        <Col span={10}>
          <IntegerInputFormItem
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
      <IntegerInputFormItem
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
      <TextInputFormItem
        title="Курсы валюты на дату(тенге/рубли РФ, доллары США и тд.)"
        name="exchangeRates"
        rules={[
          {
            required: true,
            message: "Необходимо для заполнения!",
          },
        ]}
      />
      <LargeTextInputFormItem
        title="Примечание"
        name="remark"
        value="12"
        rules={[]}
      />
    </>
  );
}
