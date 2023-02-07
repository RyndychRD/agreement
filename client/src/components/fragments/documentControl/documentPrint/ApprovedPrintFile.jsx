import {
  useGetDocumentRouteQueryHook,
  useGetDocumentQueryHook,
  useGetDocumentValuesQueryHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";

export default function ApprovedPrintFile(props) {
  const { documentId, isStart, setIsComponentLoaded, isComponentLoaded } =
    props;

  const { data: document = {}, isLoading: isLoadingDocument } =
    useGetDocumentQueryHook({
      isStart,
      id: documentId,
      isAddForeignTables: true,
    });

  const { data: documentValues = {}, isLoading: isLoadingDocumentValues } =
    useGetDocumentValuesQueryHook({
      isStart,
      documentId,
      isGetConnectedTables: true,
    });

  const { data: routeSteps = {}, isLoading: isLoadingDocumentRoute } =
    useGetDocumentRouteQueryHook({
      documentId,
      isStart,
    });
  if (!isComponentLoaded) {
    setIsComponentLoaded(
      !(isLoadingDocument || isLoadingDocumentValues || isLoadingDocumentRoute)
    );
  }
  console.log(document);
  console.log(documentValues);
  console.log(routeSteps);

  return JSON.stringify(document);
}
