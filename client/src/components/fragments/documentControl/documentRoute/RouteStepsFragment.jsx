// import { useState } from "react";
// import { Button } from "antd";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
// import RouteStepsEdit from "./RouteStepsEdit/RouteStepsEdit";
import RouteStepsShow from "./RouteStepsShow/RouteStepsShow";
import "./style.css";
import { RouteStepFragmentProvider } from "./RouteStepFragmentProvider";

export default function RouteStepsFragment(props) {
  const { isStart = false, documentId, isAbleToSign = false } = props;
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
      <RouteStepsShow routeSteps={routeSteps} isAbleToSign={isAbleToSign} />
    </RouteStepFragmentProvider>
  );
}
