import { Button, Form, Modal } from "antd";
import { useState } from "react";
import RouteFormList from "../../../inputs/routeInput";
import RouteStepShow from "../RouteStepsShow/RouteStepShow";
import { HeaderTextOutput } from "../../../outputs/textOutputs";
import { useUpdateDocumentRouteMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import ModalConfirm from "../../../modals/ModalConfirm";

export function DocumentRoutesEditModal(props) {
  const { open, setOpen, routeSteps, documentId } = props;
  const [form] = Form.useForm();

  const [updateRoute] = useUpdateDocumentRouteMutationHook();

  const unsignedRouteSteps = routeSteps
    .map((routeStep) =>
      !routeStep.actual_signer_id
        ? {
            specified_signer_id: routeStep?.deputy_signer_id
              ? routeStep?.deputy_signer_id
              : routeStep?.signer_id,
            // Запоминаем самого изначального подписанта
            firstSignerId: routeStep?.signer_id,
            // Существует для проверки что был замещающий и вернули на первоначального подписанта
            firstDeputySignerId: routeStep?.deputy_signer_id,
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
        // Чтобы не тащить в редакс много лишнего. Здесь же подгружаем пользователя
        const preparedValues = values.routeSteps.map((routeStep, index) => {
          const result = {
            step: index + 1 + startStepNumber,
            document_id: documentId,
          };
          // Если это старый шаг и у нас поменялся подписант, то он становится заместителем. Предыдущего подписанта запоминаем
          if (
            unsignedRouteSteps[index]?.firstSignerId &&
            routeStep.specified_signer_id !==
              unsignedRouteSteps[index]?.firstSignerId
          ) {
            result.signer_id = unsignedRouteSteps[index].firstSignerId;
            // Также мы проверяем, вдруг мы вернули на изначально подписанта. В таком случае замещающим он быть не должен
            result.deputy_signer_id =
              routeStep.specified_signer_id !== result.signer_id
                ? routeStep.specified_signer_id
                : null;
          } else {
            // В противном случае мы просто все равно перепишем оригинального подписанта
            result.signer_id = routeStep.specified_signer_id;
          }
          return result;
        });
        if (preparedValues.length > 0) {
          updateRoute({ documentId, routeSteps: preparedValues });
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
        setOpen(false);
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
      <Form form={form} name="">
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
