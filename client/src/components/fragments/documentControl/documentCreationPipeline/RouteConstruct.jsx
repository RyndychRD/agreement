import { Form, Modal } from "antd";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import RouteFormList from "../../inputs/routeInput";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import { useGetRouteByDocumentTypeQueryHook } from "../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";
import {
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import { useGetUsersQueryHook } from "../../../../core/redux/api/Globals/Catalogs/UserApi";
import RestoreButton from "./RestoreButton";
import SimpleSpinner from "../../messages/Spinner";
import { useGetPositionsQueryHook } from "../../../../core/redux/api/Globals/Catalogs/PositionsApi";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipelineRouteConstruct({
  onCancel,
  pipelineDispatch,
  documentMainValues,
}) {
  const [form] = Form.useForm();
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });

  // prettier-ignore
  const {data: routeByType = "",isError: isErrorRoutes,isLoading: isLoadingRoutes} = useGetRouteByDocumentTypeQueryHook({  typeId: documentMainValues.typeId });

  // Мы подгружаем здесь пользователей, так как их нужно использовать при заполнении результирующего массива. Такой же код используется потом в RouteFromList
  // В RouteFromList он используется чтобы сделать компонент более универсальным. Плюс по идее при 2 таких выполнениях он должен брать результат из кэша
  // По факту работает и хорошо, позже можно подумать как сделать иначе. Просто я не могу по условию тянуть инфу через эти хуки(((
  // Возможно, можно перейти к использованию просто функций из сервисов? С другой стороны, так я всю нужную инфу вытягиваю сразу и плюс переиспользую через кэш дальше
  // Более того, кэш действительно работает 0_0
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
    const clearedValues = routeByType?.route?.map((routeStep, index) => ({
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

  // После загрузки наполняем форму маршрутов данными.
  // У нас приходят данные в виде массива, каждый элемент которого является одним шагом.
  // В одном шаге у нас есть specified_signer_id - он показывает, установлен ли конкретный человек на подписанта. Если = -1 --- не установлен
  // Также нам в любом случае приходит default_signer - человек, который является подписантом
  // Так как мы переиспользуем фрагмент из каталога, то он ожидает принять значение по specified_signer_id. Если подписант не установлен, то он выводит значение По умолчанию
  // Но так как у нас здесь не может быть значения по умолчанию, мы вместо него передаем id разымновыванного подписанта, поддерживая таким образом 2 реализации
  if (!isErrorRoutes && !isLoadingRoutes && !isLoadingType) {
    form.setFieldsValue({
      routeSteps: routeByType.route?.map((el) => {
        if (el.specified_signer_id !== -1) return el;

        return {
          ...el,
          specified_signer_id: el.default_signer?.id
            ? el.default_signer.id
            : -1,
        };
      }),
    });
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
        console.log(clearedValues);
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
