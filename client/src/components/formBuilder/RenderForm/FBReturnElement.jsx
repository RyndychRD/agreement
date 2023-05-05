import dayjs from "dayjs";
import RenderTextInput from "./renderElements/FBRenderTextInput/FBRenderTextInput";
import RenderEmailInput from "./renderElements/FBRenderEmailInput/FBEmailInput";
import RenderDataPicker from "./renderElements/FBRenderDataPicker/FBRenderDataPicker";
import RenderPhone from "./renderElements/FBRenderPhone/FBRenderPhone";
import RenderSelectID from "./renderElements/FBRenderSelectID/FBRenderSelectID";
import RenderSelectTable from "./renderElements/FBRenderTable/FBRenderSelectTable";
import { useGetDocumentIODictionaryElementsHook } from "../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import SimpleSpinner from "../../fragments/messages/Spinner";
import SimpleError from "../../fragments/messages/Error";
import RenderNumberInput from "./renderElements/FBRenderTextInput/FBRenderNumberInput";

export default function ReturnElement(props) {
  const {
    ComponentNameForForm,
    ComponentKey,
    ComponentValue,
    form,
    formItemProps,
  } = props;
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
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, ComponentValue);
      }

      return (
        <RenderTextInput
          formItemProps={formItemProps}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
        />
      );
    case "number":
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, ComponentValue);
      }
      return (
        <RenderNumberInput
          formItemProps={formItemProps}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
        />
      );
    case "email":
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, ComponentValue);
      }
      return (
        <RenderEmailInput
          formItemProps={formItemProps}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
        />
      );
    case "datePicker":
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, dayjs(ComponentValue));
      }

      return (
        <RenderDataPicker
          formItemProps={formItemProps}
          elemNameForForm={ComponentNameForForm}
          form={form}
        />
      );
    case "phone":
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, ComponentValue);
      }
      return (
        <RenderPhone
          formItemProps={formItemProps}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
        />
      );
    case "select_id":
      if (ComponentValue) {
        form.setFieldValue(ComponentNameForForm, ComponentValue);
      }
      return (
        <RenderSelectID
          formItemProps={formItemProps}
          CurrentElement={CurrentDictElement}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
        />
      );
    // Здесь уже не стал расписывать что передается в пропсах
    case "table":
      return (
        <RenderSelectTable
          formItemProps={formItemProps}
          CurrentElement={CurrentDictElement}
          elemNameForForm={ComponentNameForForm}
          defaultValue={ComponentValue}
          form={form}
          {...props}
        />
      );

    default: {
      console.error(
        "Попытались найти элемент, но такого не существует в списке элементов =>",
        CurrentDictElement.data_type
      );
      return <span>Не найден data_type={CurrentDictElement.data_type} !</span>;
    }
  }
}
