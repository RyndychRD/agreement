import { Form, Modal } from "antd";
import { useSelector } from "react-redux";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import RouteFormList from "../../inputs/routeInput";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import { useGetRouteByDocumentTypeQueryHook } from "../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import {
  getCurrentStepJson,
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import { useGetUsersQueryHook } from "../../../../core/redux/api/Globals/Catalogs/UserApi";
import RestoreButton from "./RestoreButton";
import SimpleSpinner from "../../messages/Spinner";
import { useGetPositionsQueryHook } from "../../../../core/redux/api/Globals/Catalogs/PositionsApi";

/**
 * Модальное окно, в котором заполняется маршрут согласования при создании документа
 * @param {*} props.onCancel Функция закрытия модального окна
 * @param {*} props.pipelineDispatch Диспатчер pipeline. Выведен для возможного использования нескольких пайплайнов
 * @param {*} props.documentMainValues Предполагается, что перед вызовом этой формы всегда заполняется главная страница. Для отображения главной информации в шапки каждого документа при создании сразу передаем эти значения
 * @returns
 */
export default function DocumentCreationPipelineRouteConstruct(props) {
  const { onCancel, pipelineDispatch, documentMainValues } = props;
  const currentModalJson = useSelector(getCurrentStepJson);

  const [form] = Form.useForm();
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });

  // prettier-ignore
  const {data: routeByType = "",isError: isErrorRoutes,isLoading: isLoadingRoutes} = useGetRouteByDocumentTypeQueryHook({  typeId: documentMainValues.typeId });

  // Мы подгружаем здесь пользователей, так как их нужно использовать при заполнении результирующего массива. Такой же код используется потом в RouteFromList
  // В RouteFromList он используется чтобы сделать компонент более универсальным. Плюс по идее при 2 таких выполнениях он должен брать результат из кэша
  // prettier-ignore
  const {data: users = [],isError: isErrorUsers,isLoading: isLoadingUsers} = useGetUsersQueryHook({ isAddForeignTables:true });

  const { data: positions = [], isLoading: isLoadingPositions } =
    useGetPositionsQueryHook({});
  // Для всех типов создания документа мы проверяем доступность этого шага
  // Если шаг не доступен, запоминаем дефолтные значения и пропускаем
  if (
    !isErrorRoutes &&
    !isLoadingRoutes &&
    !isLoadingType &&
    !isLoadingPositions &&
    !type.is_route_construct_available
  ) {
    const clearedValues = routeByType?.route
      ?.filter((el) => el.specified_signer_id !== -1 || el.default_signer?.id)
      .map((routeStep, index) => ({
        signer_id: routeStep.default_signer.id,
        signer: {
          ...routeStep.default_signer,
          position_name: positions.find(
            (el) => el.id === routeStep.default_signer.position_id
          ).name,
        },
        step: index + 1,
      }));

    pipelineDispatch(saveCurrentStepJson(clearedValues));
    pipelineDispatch(nextStep());
  }

  const setFormFieldsValue = (routeSteps) => {
    form.setFieldsValue({
      routeSteps: routeSteps
        // Если у нас нет определенного человека, который должен подписать, и на выбранной позиции нет ни одного человека, то пропускаем этот шаг подписания
        ?.filter((el) => el.specified_signer_id !== -1 || el.default_signer?.id)
        .map((el) => {
          if (el.specified_signer_id !== -1) return el;

          return {
            ...el,
            specified_signer_id: el.default_signer?.id
              ? el.default_signer.id
              : -1,
          };
        }),
    });
  };

  // Если у нас уже есть сохраненные данные в pipeline, то выводим их. Иначе - стандартный вывод, если он нормально загрузился
  if (currentModalJson && Object.keys(currentModalJson).length > 0) {
    setFormFieldsValue(currentModalJson.route);
  }
  // После загрузки наполняем форму маршрутов данными.
  // У нас приходят данные в виде массива, каждый элемент которого является одним шагом.
  // В одном шаге у нас есть specified_signer_id - он показывает, установлен ли конкретный человек на подписанта. Если = -1 --- не установлен
  // Также нам в любом случае приходит default_signer - человек, который является подписантом
  // Так как мы переиспользуем фрагмент из каталога, то он ожидает принять значение по specified_signer_id. Если подписант не установлен, то он выводит значение По умолчанию
  // Но так как у нас здесь не может быть значения по умолчанию, мы вместо него передаем id разымновыванного подписанта, поддерживая таким образом 2 реализации
  else if (!isErrorRoutes && !isLoadingRoutes && !isLoadingType) {
    setFormFieldsValue(routeByType.route);
  }

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Чтобы не тащить в редакс много лишнего. Здесь же подгружаем пользователя
        const clearedValues = values.routeSteps.map((routeStep, index) => ({
          signer_id: routeStep.specified_signer_id,
          signer: users.find(
            (user) => user.id === routeStep.specified_signer_id
          ),
          step: index + 1,
        }));
        form.resetFields();
        pipelineDispatch(saveCurrentStepJson(clearedValues));
        pipelineDispatch(nextStep());
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  if (isLoadingType || isLoadingUsers || isLoadingRoutes) {
    return (
      <Modal open footer={[]}>
        Подождите, данные подгружаются
        <SimpleSpinner />
      </Modal>
    );
  }

  return (
    <Modal
      open
      onCancel={onCancel}
      onOk={onFinish}
      cancelText="Закрыть"
      okText="Далее"
      okButtonProps={
        isErrorUsers || isLoadingUsers || isLoadingType
          ? {
              disabled: "disabled",
            }
          : {}
      }
    >
      <MainDocumentInformation
        isLoading={isLoadingType}
        isError={isErrorType}
        documentName={documentMainValues.documentName}
        typeName={type.name}
      />
      <HeaderTextOutput text="Маршрут" />
      <RestoreButton
        isShow={
          !(
            isErrorRoutes ||
            isErrorUsers ||
            isLoadingRoutes ||
            isLoadingUsers ||
            isLoadingType
          )
        }
        onClick={() => {
          form.setFieldsValue({
            routeSteps: routeByType.route?.map((el) => {
              if (el.specified_signer_id !== -1) return el;
              return { ...el, specified_signer_id: el.default_signer.id };
            }),
          });
        }}
      />
      <Form form={form} name="">
        <RouteFormList
          isError={isErrorRoutes || isErrorUsers}
          isLoading={isLoadingRoutes || isLoadingUsers}
          isIncludePositionSelect={false}
        />
      </Form>
    </Modal>
  );
}
