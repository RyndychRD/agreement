export default function ShowButtonModel() {
  const state = useInnerTableState();
  const dispatch = useInnerTableDispatch();
  const isOpen = state.isShowUpdateModal && state?.currentRow;
  const [form] = Form.useForm();
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
