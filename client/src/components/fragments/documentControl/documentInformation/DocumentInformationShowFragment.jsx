import { useGetDocumentValuesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentInformationShow from "./DocumentInformationShow";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { HeaderTextOutput } from "../../outputs/textOutputs";

/**
 * Фрагмент для отображения информации по документу
 * @param {*} props.isStart Начать ли выгрузку информации по переданному id документа
 * @param {*} props.documentId Для какого документа отображать данные
 * @returns
 */
export default function DocumentInformationFragment(props) {
  const { isStart = false, documentId } = props;
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
