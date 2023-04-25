import { Button, Form, Modal } from "antd";
import { useState } from "react";
import RouteFormList from "../../../inputs/routeInput";
import RouteStepShow from "../RouteStepsShow/RouteStepShow";
import { HeaderTextOutput } from "../../../outputs/textOutputs";
import {
  useUpdateDocumentMutationHook,
  useUpdateDocumentRouteMutationHook,
} from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import ModalConfirm from "../../../modals/ModalConfirm";

export function DocumentRoutesEditModal(props) {
  const { open, setOpen, routeSteps, documentId } = props;
  const [form] = Form.useForm();

  const [updateRoute] = useUpdateDocumentRouteMutationHook();
  const [updateDocument] = useUpdateDocumentMutationHook();

  const unsignedRouteSteps = routeSteps
    .map((routeStep) =>
      !routeStep.actual_signer_id
        ? {
            specified_signer_id: routeStep?.signer_id,
            previous_signer_id: routeStep?.signer_id,
          }
        : false
    )
    .filter((routeStep) => routeStep !== false);

  const signerRouteSteps = routeSteps.filter(
    (routeStep) => routeStep.actual_signer_id
  );
  form.setFieldsValue({
    routeSteps: unsignedRouteSteps,
  });

  // Так как мы начинаем заполнять с определенного шага, то это будет наш отскок по количеству шагов
  const startStepNumber = signerRouteSteps.length;
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = values.routeSteps.map((routeStep, index) => {
          const result = {
            step: index + 1 + startStepNumber,
            document_id: documentId,
            signer_id: routeStep.specified_signer_id,
            previous_signer_id: routeStep.previous_signer_id,
          };
          return result;
        });

        updateRoute({ documentId, routeSteps: preparedValues });
        if (
          (!preparedValues || preparedValues.length === 0) &&
          startStepNumber > 0
        ) {
          updateDocument({
            document_id: documentId,
            newDocumentStatusId: 4,
          });
        }
        form.resetFields();
        setOpen(false);
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  return (
    <Modal
      open={open}
      onOk={() => {
        ModalConfirm({ onOk: onFinish, content: "Сохранить маршрут?" });
      }}
      onCancel={() => {
        ModalConfirm({
          onOk: () => {
            setOpen(false);
          },
          content: "Выйти из редактирования маршрута?",
        });
      }}
      cancelText="Закрыть"
      okText="Сохранить"
    >
      <HeaderTextOutput text="Маршрут документа" />
      <div className="routeBlock">
        {signerRouteSteps.map((routeStep) => (
          <RouteStepShow
            key={routeStep.step}
            routeStep={routeStep}
            showSignedSteps
          />
        ))}
      </div>
      <Form form={form}>
        <RouteFormList
          isIncludePositionSelect={false}
          startStepNumber={startStepNumber}
        />
      </Form>
    </Modal>
  );
}

export function DocumentRoutesEdit(props) {
  const { routeSteps, documentId } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Изменить маршрут
      </Button>
      <DocumentRoutesEditModal
        open={open}
        setOpen={setOpen}
        routeSteps={routeSteps}
        documentId={documentId}
      />
    </div>
  );
}
