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
  const { ComponentNameForForm, ComponentKey, form, title } = props;
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
        <RenderTextInput title={title} elemNameForForm={ComponentNameForForm} />
      );
    case "email":
      return (
        <RenderEmailInput
          title={title}
          elemNameForForm={ComponentNameForForm}
        />
      );
    case "datePicker":
      return (
        <RenderDataPicker
          title={title}
          elemNameForForm={ComponentNameForForm}
          form={form}
        />
      );
    case "phone":
      return (
        <RenderPhone
          title={title}
          elemNameForForm={ComponentNameForForm}
          form={form}
        />
      );
    case "select_id":
      return (
        <RenderSelectID
          title={title}
          CurrentElement={CurrentDictElement}
          elemNameForForm={ComponentNameForForm}
          form={form}
        />
      );
    // Здесь уже не стал расписывать что передается в пропсах
    case "table":
      return (
        <RenderSelectTable
          title={title}
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
      return <span>Не найдено нечего !</span>;
    }
  }
}
