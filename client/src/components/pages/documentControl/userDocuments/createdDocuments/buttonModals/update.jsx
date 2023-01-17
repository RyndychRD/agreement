import { Button, Modal } from "antd";
import RouteStepsFragment from "../../../../../fragments/documentControl/route/RouteStepsFragment";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../../../../fragments/tables/TableModalProvider";

export default function UpdateButtonModel() {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const isOpen = state.isShowUpdateModal && state.currentRow;

  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
  };
  if (isOpen)
    return (
      <Modal
        open={isOpen}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Закрыть
          </Button>,
        ]}
      >
        <span>
          Текущий выбранный договор: {state.currentRow?.document_name}
        </span>
        <RouteStepsFragment
          isStart={state.isShowUpdateModal}
          documentId={state.currentRow?.document_id}
        />
      </Modal>
    );
}
