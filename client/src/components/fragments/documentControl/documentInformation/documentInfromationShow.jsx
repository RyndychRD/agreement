import { useGetDocumentIODictionaryElementsHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import {
  HeaderTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";
import { renderDate } from "../../tables/CommonFunctions";
import TextValueOfTable from "../../outputs/tableOutputs";

// Сюда передается информация только для отображения. Сбор самой информации по документу производится выше
export default function DocumentInformationShow(props) {
  const { data } = props;
  const {
    data: DocumentIODictionaryElements = [],
    isLoading: isLoadingDictionary,
    isError: isErrorDictionary,
  } = useGetDocumentIODictionaryElementsHook();
  if (!data || data.length === 0)
    return <HeaderTextOutput text="Данные документа отсутствуют" />;
  const result = [<HeaderTextOutput text="Данные документа" />];
  if (!isLoadingDictionary && !isErrorDictionary) {
    data.forEach((dataStep, index) => {
      const dataStepDictElement = DocumentIODictionaryElements.find(
        (dict) => dict.key === dataStep.key
      );
      const keyIn = index;
      switch (dataStepDictElement.data_type) {
        case "text":
        case "phone":
        case "select_id":
        case "email":
          result.push(
            <TextOutputWithLabel
              keyIn={keyIn}
              text={dataStep.value}
              label={dataStep.label}
            />
          );
          break;
        case "datePicker":
          result.push(
            <TextOutputWithLabel
              text={renderDate(dataStep.value, false)}
              label={dataStep.label}
              keyIn={keyIn}
            />
          );
          break;
        case "table":
          result.push(
            <TextValueOfTable
              keyIn={keyIn}
              table={dataStepDictElement.select_value.table}
              value={dataStep.value}
              label={dataStep.label}
            />
          );
          break;
        default:
          result.push(
            <TextOutputWithLabel
              className="danger"
              keyIn={keyIn}
              text={`Не найден фрагмент для отображения ${dataStepDictElement.data_type}`}
              label="ОШИБКА"
            />
          );
          break;
      }
    });
  }

  if (isLoadingDictionary) return <SimpleSpinner />;
  if (isErrorDictionary) return <SimpleError />;
  return result;
}
