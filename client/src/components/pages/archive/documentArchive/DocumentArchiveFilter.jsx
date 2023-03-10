import { Button, Checkbox, Col, Form, Row } from "antd";
import { useState } from "react";
import { SelectArchiveTypesFormItem } from "../../../fragments/inputs/byClass/archive";
import { DateRangeInputFormItem } from "../../../fragments/inputs/dateInput";
import { HeaderTextOutput } from "../../../fragments/outputs/textOutputs";

export default function DocumentArchiveFilter(props) {
  const { setDataTable } = props;
  const [isAllRange, setIsAllRange] = useState(false);
  const [form] = Form.useForm();
  const onFilter = () => {
    form
      .validateFields()
      .then(async (values) => {
        setDataTable({
          isFilterRun: true,
          isAllRange,
          dateRange: values.documentCreateRange,
          archiveTypes: values.archiveTypeId,
        });
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  return (
    <div className="mainContainer">
      <HeaderTextOutput text="Поиск" />
      <Form form={form}>
        <Row gutter={10}>
          <Col span={9}>
            <DateRangeInputFormItem
              form={form}
              key="documentCreateRange"
              name="documentCreateRange"
              title="Выберите промежуток дат создания документов"
              rules={[
                {
                  required: true,
                  message: "Выберите тип архива",
                },
              ]}
              disabled={isAllRange}
            />
            <Checkbox
              name="isAllRange"
              onClick={() => {
                setIsAllRange(!isAllRange);
              }}
            >
              Выбрать за все время?
            </Checkbox>
          </Col>
          <Col span={9}>
            <SelectArchiveTypesFormItem isModeMultiple />
          </Col>
          <Col offset={4} span={2} className="mainContainerButtonDiv">
            <Button onClick={onFilter} type="primary">
              Найти
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
