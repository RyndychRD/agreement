// import { useState } from "react";
// import { Button } from "antd";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
// import RouteStepsEdit from "./RouteStepsEdit/RouteStepsEdit";
import RouteStepsShow from "./RouteStepsShow/RouteStepsShow";
import "./style.css";
import { RouteStepFragmentProvider } from "./RouteStepFragmentProvider";
import { HeaderTextOutput } from "../../outputs/textOutputs";
import { DocumentRoutesEdit } from "./RouteStepsEdit/RouteStepsEdit";

/**
 * Фрагмент отображения шагов подписания. Включает в себя возможность изменения маршрута и подписания текущего шага
 * @param {*} props.isStart начать ли сбор информации по документу
 * @param {*} props.documentId
 * @param {*} props.isAbleToSign дать возможность пользователю подписать документ?
 * @param {*} props.isAbleToEdit дать возможность пользователю изменить маршрут подписания?
 * @returns
 */
export default function RouteStepsFragment(props) {
  const {
    isStart = false,
    documentId,
    isAbleToSign = false,
    isAbleToEdit = false,
  } = props;
  const {
    data: routeSteps = {},
    isLoading,
    isError,
  } = useGetDocumentRouteQueryHook({
    documentId,
    isStart,
  });

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <RouteStepFragmentProvider>
      <HeaderTextOutput text="Маршрут документа" />
      <RouteStepsShow routeSteps={routeSteps} isAbleToSign={isAbleToSign} />

      {isAbleToEdit ? (
        <DocumentRoutesEdit routeSteps={routeSteps} documentId={documentId} />
      ) : (
        ""
      )}
    </RouteStepFragmentProvider>
  );
}
