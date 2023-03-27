import DocumentTasksTable from "./DocumentTasksTable";

export default function DocumentTasksFragment(props) {
  const { documentId, documentTypeId } = props;
  return (
    <DocumentTasksTable
      documentId={documentId}
      documentTypeId={documentTypeId}
    />
  );
}
