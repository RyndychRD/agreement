import DocumentTasksTable from "./DocumentTasksTable";

export default function DocumentTasksFragment(props) {
  const { documentId } = props;
  return <DocumentTasksTable documentId={documentId} />;
}
