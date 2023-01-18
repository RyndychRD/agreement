import RenderDataPicker from "../ElementsFormBuilder/FBRenderDataPicker/FBRenderDataPicker";
import RenderEmailInput from "../ElementsFormBuilder/FBRenderEmailInput/FBEmailInput";
import RenderPhone from "../ElementsFormBuilder/FBRenderPhone/FBRenderPhone";
import RenderSelectID from "../ElementsFormBuilder/FBRenderSelectID/FBRenderSelectID";
import RenderSelectTable from "../ElementsFormBuilder/FBRenderTable/FBRenderSelectTable";
import RenderTextInput from "../ElementsFormBuilder/FBRenderTextInput/FBRenderTextInput";
import { useGetElementsHook } from "../../../core/redux/api/Globals/Catalogs/DocumentElementIODictionaryApi";
import { useGetDocumentTypeViewHook } from "../../../core/redux/api/Globals/Catalogs/DocumentTypesViewsApi";

export default function ReturnElement(props) {
  const { AreaType } = props;

  const { data: DocumentElementIODictionaries = [] } = useGetElementsHook();

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
