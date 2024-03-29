import { Button, Form, Modal } from "antd";
import { useEffect } from "react";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";

import DocumentTasksShowBlock from "../DocumentTasksShow";
import {
  useCompleteDocumentTaskMutationHook,
  useGetDocumentTaskQueryHook,
} from "../../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import {
  useDocumentTasksInnerTableState,
  useDocumentTasksInnerTableDispatch,
} from "../../../tables/DocumentTasksInnerTableProvider";
import ModalUpdate from "../../../modals/modalUpdate";
import NotificationService from "../../../../../services/DocumentControlServices/NotificationService";

/**
 * Модальное окно при отображении поручения
 * @returns
 */
export default function ShowButtonModel() {
  const state = useDocumentTasksInnerTableState();
  const dispatch = useDocumentTasksInnerTableDispatch();
  const isOpen =
    state.isShowUpdateModal &&
    state.currentRow !== undefined &&
    state.currentRow !== null;
  const [form] = Form.useForm();
  const {
    data = {},
    isLoading,
    isError,
  } = useGetDocumentTaskQueryHook({
    currentRow: state?.currentRow,
    isStart: isOpen,
    isAddForeignTables: true,
    isAddDocumentValues: true,
    isAddDocumentFiles: true,
  });

  useEffect(() => {
    if (isOpen) {
      NotificationService.readNotifications({
        elementId: state.currentRow.key,
        notificationType: "CompleteTask",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
  };
  if (data.document_task_type_id === 2 && data.document_task_status_id === 2) {
    const formDefaultValues = (dataRaw) => ({
      fullNameOfTheItemInBudget:
        dataRaw.custom_fields?.fullNameOfTheItemInBudget,
      currentNDS: dataRaw.custom_fields?.currentNDS,
      budgetSumNoNDS: dataRaw.custom_fields?.budgetSumNoNDS,
      budgetSumWithNDS: dataRaw.custom_fields?.budgetSumWithNDS,
      contractSumNoNDS: dataRaw.custom_fields?.contractSumNoNDS,
      contractSumWithNDS: dataRaw.custom_fields?.contractSumWithNDS,
      exchangeRates: dataRaw.custom_fields?.exchangeRates,
      remark: dataRaw.custom_fields?.remark,
    });

    const preFinishFunc = (values) => ({
      ...values,
      isSecondPageAgreementFromCustomFieldsConfirmed: true,
    });

    return (
      <ModalUpdate
        getQuery={useGetDocumentTaskQueryHook}
        updateMutation={useCompleteDocumentTaskMutationHook}
        form={form}
        preFinishFunc={preFinishFunc}
        CreateUpdateForm={DocumentTasksShowBlock}
        formDefaultValues={formDefaultValues}
        customState={useDocumentTasksInnerTableState}
        customDispatch={useDocumentTasksInnerTableDispatch}
        okButtonText="Подтвердить"
        additionalGetQueryProps={{
          currentRow: state?.currentRow,
          isStart: state.isShowUpdateModal,
          isAddForeignTables: true,
          isAddDocumentValues: true,
          isAddDocumentFiles: true,
        }}
      />
    );
  }
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
        <DocumentTasksShowBlock rawData={data} />
      ) : (
        ""
      )}
    </Modal>
  );
}
