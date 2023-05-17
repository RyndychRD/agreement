import { Alert } from "antd";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import DocumentValuesService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentValuesService";

/**
 * Отображает values у документа с помощью обычного текста
 * @param {*} props.data сами данные для отображения
 * @param {*} props.isPrepareData требуется ли предобработка и разыменование идшников перед отображением
 * @returns
 */
export default function DocumentInformationShow(props) {
  const { data, isPrepareData = true } = props;
  if (!data || data.length === 0)
    return <Alert type="error" message="Данные документа отсутствуют" />;
  return data.map((dataStep, index) => {
    const keyIn = index;
    const information = isPrepareData
      ? DocumentValuesService.getValueAndLabelFromDocumentValue(dataStep)
      : dataStep;
    if (!information) return "";
    const text =
      information?.select_name && information.select_name !== information.key
        ? information.select_name
        : information.value;
    if (text) {
      return (
        <TextOutputWithLabel
          key={keyIn}
          text={text}
          label={<b>{information.label}</b>}
          className={information?.className}
        />
      );
    }
    return "";
  });
}
