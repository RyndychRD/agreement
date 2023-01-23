import RenderTextInput from "./renderElements/FBRenderTextInput/FBRenderTextInput";
import RenderEmailInput from "./renderElements/FBRenderEmailInput/FBEmailInput";
import RenderDataPicker from "./renderElements/FBRenderDataPicker/FBRenderDataPicker";
import RenderPhone from "./renderElements/FBRenderPhone/FBRenderPhone";
import RenderSelectID from "./renderElements/FBRenderSelectID/FBRenderSelectID";
import RenderSelectTable from "./renderElements/FBRenderTable/FBRenderSelectTable";
import { useGetDocumentTypeViewHook } from "../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import { useGetDocumentIODictionaryElementsHook } from "../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";

export default function ReturnElement(props) {
  const { AreaType } = props;

  const { data: DocumentElementIODictionaries = [] } =
    useGetDocumentIODictionaryElementsHook();

  const CurrentElement = DocumentElementIODictionaries.filter(
    (i) => i.key === AreaType
  )[0];

  const { data: DocumentTypeViews = [], isLoading } =
    useGetDocumentTypeViewHook({ id: "1" });

  if (!isLoading) {
    const DataKey = DocumentTypeViews?.view?.elements_order.find(
      (i) => i.key === AreaType
    );
    switch (DataKey.typeData) {
      case "text":
        return <RenderTextInput CurrentElement={CurrentElement} {...props} />;
      case "email":
        return <RenderEmailInput CurrentElement={CurrentElement} {...props} />;
      case "datePicker":
        return <RenderDataPicker CurrentElement={CurrentElement} {...props} />;
      case "phone": {
        return <RenderPhone CurrentElement={CurrentElement} {...props} />;
      }
      case "select_id": {
        return <RenderSelectID CurrentElement={CurrentElement} {...props} />;
      }
      case "table": {
        return <RenderSelectTable CurrentElement={CurrentElement} {...props} />;
      }

      default: {
        console.error(
          "Попытались найти элемент но такого не существует в списке элементов =>",
          DataKey
        );
        return <span>Не найдено нечего !</span>;
      }
    }
  }
}
