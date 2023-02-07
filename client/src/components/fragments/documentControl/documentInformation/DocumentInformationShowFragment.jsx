import { useGetDocumentValuesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentInformationShow from "./DocumentInformationShow";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { HeaderTextOutput } from "../../outputs/textOutputs";

export default function DocumentInformationFragment({
  isStart = false,
  documentId,
}) {
  const {
    data: documentValues = {},
    isLoading: isLoadingValues,
    isError: isErrorValues,
  } = useGetDocumentValuesQueryHook({
    isStart,
    documentId,
    isGetConnectedTables: true,
  });

  if (isLoadingValues) return <SimpleSpinner />;
  if (isErrorValues) return <SimpleError />;
  return (
    <>
      <HeaderTextOutput text="Данные документа" />
      <DocumentInformationShow data={documentValues} />
    </>
  );
}
