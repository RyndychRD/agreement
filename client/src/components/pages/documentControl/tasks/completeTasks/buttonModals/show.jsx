import { Button, Form, Modal } from "antd";
import { useEffect } from "react";
import { useGetDocumentTaskQueryHook } from "../../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../../../../fragments/tables/TableModalProvider";
import SimpleSpinner from "../../../../../fragments/messages/Spinner";
import SimpleError from "../../../../../fragments/messages/Error";
import DocumentTasksShowBlock from "../../../../../fragments/documentControl/documentTasks/DocumentTasksShow";

export default function ShowButtonModel() {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const isOpen = state.isShowUpdateModal && state?.currentRow;
  const {
    data = {},
    isLoading,
    isError,
  } = useGetDocumentTaskQueryHook({
    currentRow: state?.currentRow,
    isStart: state.isShowUpdateModal,
    isAddForeignTables: true,
    isAddDocumentValues: true,
    isAddDocumentFiles: true,
  });
  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && !isLoading && !isError) {
      if (data?.custom_fields) {
        form.setFieldsValue(data.custom_fields);
      }
    }
  }, [isOpen, isLoading, isError, data.custom_fields, form]);

  return (
    <Modal
      width={700}
      footer={<Button onClick={onCancel}>Закрыть</Button>}
      onCancel={onCancel}
      open={isOpen}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? (
        <DocumentTasksShowBlock
          rawData={data}
          form={form}
          isAddPushToDocumentButton={false}
          isDisabled
        />
      ) : (
        ""
      )}
    </Modal>
  );
}
