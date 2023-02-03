import { Button, Modal } from "antd";
import { clearUrlQueryParams } from "../../../../../services/CommonFunctions";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";

import DocumentTasksShowBlock from "../DocumentTasksShow";
import { useGetDocumentTaskQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import {
  useInnerTableState,
  useInnerTableDispatch,
} from "../../../tables/InnerTableProvider";

export default function ShowButtonModel() {
  const state = useInnerTableState();
  const dispatch = useInnerTableDispatch();
  const isOpen = state.isShowUpdateModal;

  const {
    data = {},
    isLoading,
    isError,
  } = useGetDocumentTaskQueryHook({
    currentRow: state?.currentRow,
    isStart: state.isShowUpdateModal,
    isAddForeignTables: true,
  });
  const onCancel = () => {
    clearUrlQueryParams();
    dispatch({ type: "closeAllModal" });
  };
  return (
    <Modal footer={<Button onClick={onCancel}>Отмена</Button>} open={isOpen}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? (
        <DocumentTasksShowBlock task={data} />
      ) : (
        ""
      )}
    </Modal>
  );
}
