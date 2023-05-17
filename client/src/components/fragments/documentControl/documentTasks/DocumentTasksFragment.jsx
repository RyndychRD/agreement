import DocumentTasksTable from "./DocumentTasksTable";

/**
 * Фрагмент для отображения таблицы с поручениями
 * @param {*} props.documentId
 * @param {*} props.documentTypeId
 * @returns
 */
export default function DocumentTasksFragment(props) {
  const { documentId, documentTypeId } = props;
  return (
    <DocumentTasksTable
      documentId={documentId}
      documentTypeId={documentTypeId}
    />
  );
}
