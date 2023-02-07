import { Alert } from "antd";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import { renderDate } from "../../tables/CommonFunctions";

export function getValueAndLabelFromDocumentValue(dataStep) {
  switch (dataStep.data_type) {
    case "text":
    case "phone":
    case "select_id":
    case "email":
      return { value: dataStep.value, label: dataStep.label };

    case "datePicker":
      return {
        value: renderDate(dataStep.value, false),
        label: dataStep.label,
      };
    case "table":
      return { value: dataStep.value.name, label: dataStep.label };
    default:
      return {
        value: `Не найден фрагмент для отображения ${dataStep.data_type}`,
        label: "ОШИБКА",
        className: "danger",
      };
  }
}

// Сюда передается информация только для отображения. Сбор самой информации по документу производится выше
export default function DocumentInformationShow(props) {
  const { data } = props;
  if (!data || data.length === 0)
    return <Alert type="error" message="Данные документа отсутствуют" />;
  return data.map((dataStep, index) => {
    const keyIn = index;
    const information = getValueAndLabelFromDocumentValue(dataStep);
    return (
      <TextOutputWithLabel
        key={keyIn}
        text={information.value}
        label={information.label}
        className={information?.className}
      />
    );
  });
}
