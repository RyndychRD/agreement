import { useState } from "react";
import { Button } from "antd";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentSigning/DocumentRouteApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import RouteStepsEdit from "./RouteStepsEdit/RouteStepsEdit";
import RouteStepsShow from "./RouteStepsShow/RouteStepsShow";

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

  const [isEdit, setIsEdit] = useState(false);

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  if (isEdit) {
    return (
      <>
        <Button
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          Сохранить маршрут
        </Button>
        <br />
        <RouteStepsEdit routeSteps={routeSteps} />
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        Редактировать маршрут
      </Button>
      <br />
      <RouteStepsShow routeSteps={routeSteps} />
    </>
  );
}
