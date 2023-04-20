import { Button, Checkbox, Col, Form, Row } from "antd";
import { useState } from "react";
import ArchiveLogService from "../../../../services/LogService/ArchiveLogService";
import { SelectArchiveTypesFormItem } from "../../../fragments/inputs/byClass/archive";
import { DateRangeInputFormItem } from "../../../fragments/inputs/dateInput";
import { HeaderTextOutput } from "../../../fragments/outputs/textOutputs";
import { useLogState } from "../../../log/LogProvider";
import ModalConfirm from "../../../fragments/modals/ModalConfirm";

export default function DocumentArchiveFilter(props) {
  const stateLog = useLogState();
  const { setDataTable } = props;
  const [isAllRange, setIsAllRange] = useState(false);
  const [form] = Form.useForm();

  const setData = (values) => {
    setDataTable({
      isFilterRun: true,
      isAllRange,
      dateRange: values.documentCreateRange,
      archiveTypes: values.archiveTypeId,
    });
    // Отправляем данные в логи
    if (stateLog.logTypes.logFilter) {
      new ArchiveLogService().logUserRequestDocuments(
        values.archiveTypeId,
        isAllRange ? null : values.documentCreateRange
      );
    }
  };

  const onFilter = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (isAllRange) {
          ModalConfirm({
            content:
              "Загрузка архива за все время может занять продолжительное время. Вы уверены?",
            onOk: () => {
              setData(values);
            },
            okText: "Да, выгрузить архив за все время",
            cancelText: "Нет",
          });
        } else {
          setData(values);
        }
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
              title="Выберите промежуток дат регистрации"
              rules={[
                {
                  required: true,
                  message: "Выберите промежуток дат регистрации",
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
