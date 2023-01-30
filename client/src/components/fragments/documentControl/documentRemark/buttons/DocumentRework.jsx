import { Button } from "antd";
import { useUpdateDocumentMutation } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../../tables/TableModalProvider";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";

export default function DocumentReworkButtons() {
  const state = useTableModalsState();
  const dispatchTable = useTableModalDispatch();
  const [updateFunc, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] =
    useUpdateDocumentMutation();
  const onClick = async () => {
    const valuesToSend = {
      document_id: state.currentRow.document_id,
      newDocumentStatusId: 5,
      newRemark: "",
    };
    await updateFunc(valuesToSend).unwrap();
    if (!isErrorUpdate) {
      dispatchTable({ type: "closeAllModal" });
    }
  };
  return (
    <>
      <Button onClick={onClick} className="mt-5">
        Замечание исправлено
      </Button>
      {isLoadingUpdate ? <SimpleSpinner /> : ""}
      {isErrorUpdate ? <SimpleError /> : ""}
    </>
  );
}
