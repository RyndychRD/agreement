// import { useState } from "react";
// import { Button } from "antd";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentSigning/DocumentRouteApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
// import RouteStepsEdit from "./RouteStepsEdit/RouteStepsEdit";
import RouteStepsShow from "./RouteStepsShow/RouteStepsShow";
import "./style.css";
import { RouteStepFragmentProvider } from "./RouteStepFragmentProvider";

export default function RouteStepsFragment(props) {
  const { isStart = false, documentId } = props;
  const {
    data: routeSteps = {},
    isLoading,
    isError,
  } = useGetDocumentRouteQueryHook({
    documentId,
    isStart,
  });

  // const [isEdit, setIsEdit] = useState(false);

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  // if (isEdit) {
  //   return (
  //     <>
  //       <Button
  //         onClick={() => {
  //           setIsEdit(!isEdit);
  //         }}
  //       >
  //         Сохранить маршрут
  //       </Button>
  //       <br />
  //       <RouteStepsEdit routeSteps={routeSteps} />
  //     </>
  //   );
  // }
  return (
    <RouteStepFragmentProvider>
      {/* Этот функционал будет добавлен позже */}
      {/* <Button
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        Редактировать маршрут */}
      {/* </Button> */}
      <RouteStepsShow routeSteps={routeSteps} />
    </RouteStepFragmentProvider>
  );
}
