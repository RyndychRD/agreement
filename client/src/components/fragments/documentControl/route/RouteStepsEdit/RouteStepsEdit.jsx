import RouteStepEdit from "./RouteStepEdit";

export default function RouteStepsEdit({ routeSteps }) {
  return (
    <>
      <span>Редактирование маршрута документа</span>
      {routeSteps.map((step) => (
        <RouteStepEdit key={step.step} step={step} />
      ))}
    </>
  );
}
