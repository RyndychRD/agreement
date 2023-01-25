import { useGetDocumentValuesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentInformationShow from "./DocumentInfromationShow";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";

export default function DocumentInformationFragment({
  isStart = false,
  documentId,
}) {
  const {
    data: documentValues = {},
    isLoading: isLoadingValues,
    isError: isErrorValues,
  } = useGetDocumentValuesQueryHook({ isStart, documentId });

  if (isLoadingValues) return <SimpleSpinner />;
  if (isErrorValues) return <SimpleError />;
  const data = documentValues.map((documentValue) => ({
    ...documentValue,
    key: documentValue.document_element_IO_dictionary_key,
  }));
  return <DocumentInformationShow data={data} />;
}
