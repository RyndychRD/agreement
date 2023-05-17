import { Alert, Card, Steps } from "antd";
import { userNameWithPositionMask } from "../../../../../services/CommonFunctions";
import { renderDate } from "../../../tables/CommonFunctions";
import { useGetUsersQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";

/**
 * Вывод данных для неподписанной карточки
 * @param {*} step
 * @param {*} users
 * @returns
 */
function getNotSignedCard(step, users) {
  const items = [];
  items.push({
    title: userNameWithPositionMask(step.signer),
    description: "Текущий подписант",
  });
  if (
    users &&
    users.length > 0 &&
    step.document_signature_history &&
    step.document_signature_history.length > 0
  ) {
    step.document_signature_history.forEach((history) => {
      const previousSigner = users.find(
        (user) => user.id === history.signer_id
      );
      items.push({
        title: userNameWithPositionMask(previousSigner),
        status: "wait",
        description: `Был изменен ${renderDate(history.created_at)}`,
      });
    });
  }

  return <Steps size="small" progressDot direction="vertical" items={items} />;
}

/**
 * Отображения типа подписи(Согласован/Не согласован/ Согласован с замечанием)
 * @param {*} documentSignatureType
 * @returns
 */
function getSignTypeMessage(documentSignatureType) {
  let type = "";
  const message = documentSignatureType?.name
    ? documentSignatureType.name
    : "Не подписано";
  switch (documentSignatureType?.id) {
    case 1:
      type = "success";
      break;
    case 2:
      type = "error";
      break;
    case 3:
      type = "warning";
      break;
    default:
      type = "info";
      break;
  }
  return (
    <Alert
      type={type}
      style={{ padding: "2px", width: "fit-content" }}
      message={message}
    />
  );
}

/**
 * Титульник для шага подписания с номером шага и статусом шага(Не подписан/Согласован...)
 * @param {*} stepNumber
 * @param {*} documentSignatureType
 * @returns
 */
function getTitle(stepNumber, documentSignatureType) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {getSignTypeMessage(documentSignatureType)}
      <div>{`Шаг №${stepNumber}`}</div>
    </div>
  );
}

/**
 * Возвращает инфомацию по подписанной карточке
 * @param {*} step
 * @returns
 */
function getSignedCard(step) {
  return (
    <div>
      <p>
        {userNameWithPositionMask(step.actual_signer)} -{" "}
        {renderDate(step.sign_date)}
      </p>
      {step?.remark ? (
        <p>
          <i>{step.remark}</i>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

/**
 * Возвращает css класс согласно типу карточки
 * @param {*} actualSignerId
 * @param {*} showSignedSteps Включено ли отображение подписанных шагов
 * @param {*} showUnsignedSteps Включено ли отображение неподписанных шагов
 * @returns
 */
function getClassBySign(actualSignerId, showSignedSteps, showUnsignedSteps) {
  let result = "";
  if (actualSignerId) {
    result += "signed";
  } else {
    result += "not-signed";
  }
  if (showSignedSteps && actualSignerId) {
    result += " displayBlockImportant";
  }
  if (showUnsignedSteps && !actualSignerId) {
    result += " displayBlockImportant";
  }
  return result;
}

/**
 * Возвращает карточку подписания для одного шага
 * @param {*} props.routeStep сам шаг подписания
 * @param {*} props.showSignedSteps показывать ли подписанные шаги
 * @param {*} props.showUnsignedSteps показывать ли не подписанные шаги
 * @param {*} props.title можно передать кастомный хедер для карточки. Иначе будет отображен стандартный
 * @param {*} props.cardDataPassed можно передать кастомную информацию для отображения внутри карточки или будет отображен стандартный
 * @returns
 */
export default function RouteStepShow(props) {
  const {
    routeStep,
    showSignedSteps,
    showUnsignedSteps,
    title,
    cardDataPassed = null,
  } = props;
  const {
    step: stepNumber,
    actual_signer_id: actualSignerId,
    document_signature_type: documentSignatureType,
  } = routeStep;

  // prettier-ignore
  const {data: users = {},isLoading:isLoadingUsers,isError:isErrorUsers} = useGetUsersQueryHook({isAddForeignTables:true});
  let cardData = null;
  // Наполняем карточку данными
  if (actualSignerId) {
    cardData = getSignedCard(routeStep);
  } else {
    cardData = getNotSignedCard(routeStep, users);
  }
  if (isLoadingUsers) return <SimpleSpinner />;
  if (isErrorUsers) return <SimpleError />;
  return (
    <Card
      className={` ${getClassBySign(
        actualSignerId,
        showSignedSteps,
        showUnsignedSteps
      )} routeCard `}
      key={`card ${stepNumber}`}
      size="small"
      title={title || getTitle(stepNumber, documentSignatureType)}
    >
      {cardDataPassed || cardData}
    </Card>
  );
}
