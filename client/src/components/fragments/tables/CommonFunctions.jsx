/** @format */
import _ from "lodash";
import moment from "moment";
import { Col, Row, Button, Tag, Alert } from "antd";
import ModalConfirm from "../modals/ModalConfirm";

/**
 * Используется для создания фильтра по всем значениями из таблицы. По факту магия, я не могу понять что здесь происходит
 * Исходник - https://stackoverflow.com/questions/53885363/ant-design-filter-a-column-by-all-its-existed-data
 * @param {*} data Список значений для отображения в фильтре
 * @param {*} formatter Функция с магией
 * @returns
 */
export const filterData = (data) => (formatter) =>
  data?.map((item) => ({
    text: formatter(item),
    value: formatter(item),
  }));

export const getCurrentDate = (format = "DD.MM.YYYY") =>
  moment().format(format);

/**
 * Возвращает данные для фильтрации в отсортированном порядке. Используется для строк
 * @param {*} dataSource
 * @param {*} columnName Название колонки в dataSource, по которой нужно вывести данные
 * @returns
 */
export const filterDataStringSorted = (dataSource, columnName) =>
  _?.uniqWith(
    filterData(
      dataSource?.sort((a, b) =>
        a?.[columnName]?.localeCompare(b?.[columnName])
      )
    )((i) => i?.[columnName]),
    _?.isEqual
  );

/**
 * Возвращает данные для фильтрации в отсортированном порядке. Используется для булевых значений
 * @param {*} dataSource
 * @param {*} columnName Название колонки в dataSource, по которой нужно вывести данные
 * @returns
 */
export const filterDataBoolean = (dataSource, columnName) => {
  _?.uniqWith(
    filterData(dataSource)((i) => (i?.[columnName] ? "Да" : "Нет")),
    _?.isEqual
  );
};

export const renderDate = (date, isAddTime = true) => {
  if (!date) return "";
  if (isAddTime) return date ? moment(date).format("DD.MM.YYYY HH:mm") : "";
  return date ? moment(date).format("DD.MM.YYYY") : "";
};

export const filterDateLogic = (value, record, columnName) =>
  moment(record[columnName]).format("YYYY") === value;

export const filterDateYearly = (dataSource, columnName) =>
  _?.uniqWith(
    filterData(
      // Сортируем в порядке убывания
      dataSource?.sort(
        (a, b) => !a?.[columnName]?.localeCompare(b?.[columnName])
      )
    )((i) => moment(i?.[columnName]).format("YYYY")),
    _?.isEqual
  );

/**
 * Функция для рендера прав
 * @param {*} items
 * @returns
 */
export const renderRights = (items) => {
  const uniqItems = _.uniqBy(items, "id");
  return uniqItems.map((item) => {
    if (!item?.id || item?.id === null) return "";
    let color = "green";
    if (item.isInherited) color = "";
    if (item.id === 1) color = "red";
    if (item.id === 13) color = "orange";
    return (
      <Tag style={{ margin: "5px" }} key={item.id} color={color}>
        {item.name}
      </Tag>
    );
  });
};

/**
 * Сортирует буленовы значения.
 * Если a - true, то оно поднимается выше. Иначе - опускает ниже. Если текущий и рассматриваемый элемент одинаковы - без изменений
 */
export function sorterBoolean(a, b) {
  if (a === b) {
    return 0;
  }
  return a ? -1 : 1;
}

// сортировка по возрастающей дате
export function sorterDate(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateA - dateB;
}

/**
 * Сортирует в алфавитном порядке
 */
export function sorterStringAlphabet(a, b) {
  return a?.localeCompare(b);
}

/**
 * Сортирует в порядке возрастания
 */
export function sorterInt(a, b) {
  return a - b;
}

export function booleanRender(value) {
  return value ? (
    <Alert className="boolean-render" type="success" message="Да" />
  ) : (
    <Alert className="boolean-render" type="error" message="Нет" />
  );
}

/**
 * Конструктор заголовка таблицы
 * @param {string} name - Название в заголовке таблицы
 * @param {Array} buttons - Массив со списком кнопок, которые мы хотим отобразить в заголовке
 * @returns
 */
export default function getTitle(name, buttons, buttonsActions) {
  /**
   * Словарь всех возможных кнопок в заголовке
   */
  const buttonsDict = {
    create: (
      <Button
        key="keyCreateAdminTableSettings"
        type="primary"
        onClick={buttonsActions.create}
        className="space-right"
        style={{ height: "max-height" }}
      >
        Создать
      </Button>
    ),
    createSpecialTask: (
      <Button
        key="keyCreateSpecialTask"
        type="primary"
        onClick={buttonsActions.createSpecialTask}
        className="space-right"
        style={{ width: "200px", whiteSpace: "normal", height: "auto" }}
      >
        Запросить 2 раздел листа согласования закупа ТРУ
      </Button>
    ),
    delete: (
      <Button
        key="keyDeleteAdminTableSettings"
        danger
        onClick={buttonsActions.delete}
        className="space-right"
      >
        Удалить
      </Button>
    ),
    update: (
      <Button
        key="keyUpdateAdminTableSettings"
        type="primary"
        onClick={buttonsActions.update}
        className="space-right "
      >
        Просмотр
      </Button>
    ),
    restore: (
      <Button
        key="keyRestoreAdminTableSettings"
        type="primary"
        onClick={buttonsActions.restore}
        className="space-right "
      >
        Восстановить документ
      </Button>
    ),
    excel: (
      <Button
        key="keyDownloadExcelAdminTableSettings"
        onClick={buttonsActions.excel}
        className="space-right "
      >
        Скачать в Excel
      </Button>
    ),
    reject: (
      <Button
        key="keyRejectDocumentAdminTableSettings"
        onClick={buttonsActions.reject}
        danger
        className="space-right "
      >
        Отклонить документ
      </Button>
    ),
  };

  /** Выбираем только запрошенные кнопки */
  const buttonsView = [];
  buttons.forEach((key) => {
    buttonsView.push(buttonsDict[key]);
  });

  return (
    <Row>
      <Col flex="auto">
        <div className="center-text">
          <span className="table-header">{name}</span>
        </div>
      </Col>
      <Col style={{ display: "flex", alignItems: "center" }}>{buttonsView}</Col>
    </Row>
  );
}
export function onCancelConfirm(onCancel) {
  ModalConfirm({
    content: "Вы точно хотите прекратить и потерять все заполненные данные?",
    onOk: () => {
      onCancel();
    },
    okText: "Да, я хочу потерять заполненные данные",
    cancelText: "Нет",
  });
}
