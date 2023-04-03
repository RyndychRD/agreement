import RenderTextInput from "./renderElements/FBRenderTextInput/FBRenderTextInput";
import RenderEmailInput from "./renderElements/FBRenderEmailInput/FBEmailInput";
import RenderDataPicker from "./renderElements/FBRenderDataPicker/FBRenderDataPicker";
import RenderPhone from "./renderElements/FBRenderPhone/FBRenderPhone";
import RenderSelectID from "./renderElements/FBRenderSelectID/FBRenderSelectID";
import RenderSelectTable from "./renderElements/FBRenderTable/FBRenderSelectTable";
import { useGetDocumentIODictionaryElementsHook } from "../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import SimpleSpinner from "../../fragments/messages/Spinner";
import SimpleError from "../../fragments/messages/Error";

export default function ReturnElement(props) {
  const { ComponentNameForForm, ComponentKey, form } = props;
  const {
    data: DocumentIODictionaryElements = [],
    isLoading: isLoadingDictionary,
    isError: isErrorDictionary,
  } = useGetDocumentIODictionaryElementsHook();

  const CurrentDictElement = DocumentIODictionaryElements.find(
    (i) => i.key === ComponentKey
  );

  if (isLoadingDictionary) return <SimpleSpinner />;
  if (isErrorDictionary) return <SimpleError />;
  switch (CurrentDictElement.data_type) {
    case "text":
      return (
        <RenderTextInput elemNameForForm={ComponentNameForForm} form={form} />
      );
    case "email":
      return (
        <RenderEmailInput elemNameForForm={ComponentNameForForm} form={form} />
      );
    case "datePicker":
      return (
        <RenderDataPicker elemNameForForm={ComponentNameForForm} form={form} />
      );
    case "phone":
      return <RenderPhone elemNameForForm={ComponentNameForForm} form={form} />;
    case "select_id":
      return (
        <RenderSelectID
          CurrentElement={CurrentDictElement}
          elemNameForForm={ComponentNameForForm}
          form={form}
        />
      );
    // Здесь уже не стал расписывать что передается в пропсах
    case "table":
      return (
        <RenderSelectTable
          CurrentElement={CurrentDictElement}
          elemNameForForm={ComponentNameForForm}
          {...props}
        />
      );

    default: {
      console.error(
        "Попытались найти элемент но такого не существует в списке элементов =>",
        CurrentDictElement.data_type
      );
      return <span>Не найден data_type={CurrentDictElement.data_type} !</span>;
    }
  }
}
