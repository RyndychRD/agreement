import { Alert } from "antd";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import DocumentValuesService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentValuesService";

// Сюда передается информация только для отображения. Сбор самой информации по документу производится выше
export default function DocumentInformationShow(props) {
  const { data, isPrepareData = true } = props;
  if (!data || data.length === 0)
    return <Alert type="error" message="Данные документа отсутствуют" />;
  return data.map((dataStep, index) => {
    const keyIn = index;
    const information = isPrepareData
      ? DocumentValuesService.getValueAndLabelFromDocumentValue(dataStep)
      : dataStep;
    return (
      <TextOutputWithLabel
        key={keyIn}
        text={
          information?.select_name &&
          information.select_name !== information.key
            ? information.select_name
            : information.value
        }
        label={information.label}
        className={information?.className}
      />
    );
  });
}
