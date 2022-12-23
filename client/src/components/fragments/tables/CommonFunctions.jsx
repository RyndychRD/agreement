/** @format */

import { ARow, ACol, ASpan, ADiv, AButton, AAlert } from "../../adapter";

/**
 * Используется для создания фильтра по всем значениями из таблицы. По факту магия, я не могу понять что здесь происходит
 * Исходник - https://stackoverflow.com/questions/53885363/ant-design-filter-a-column-by-all-its-existed-data
 * @param {*} data Список значений для отображения в фильтре
 * @param {*} formatter Функция с магией
 * @returns
 */
export const filterData = (data) => (formatter) =>
  data.map((item) => ({
    text: formatter(item),
    value: formatter(item),
  }));

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

/**
 * Сортирует в алфавитном порядке
 */
export function sorterStringAlphabet(a, b) {
  return a.localeCompare(b);
}

/**
 * Сортирует в порядке возрастания
 */
export function sorterInt(a, b) {
  return a - b;
}

export function booleanRender(value) {
  return value ? (
    <AAlert className="boolean-render" type="success" message="Да" />
  ) : (
    <AAlert className="boolean-render" type="error" message="Нет" />
  );
}

/**
 * Конструктор заголовка таблицы
 * @param {string} name - Название в заголовке таблицы
 * @param {Array} buttons - Массив со списком кнопок, которые мы хотим отобразить в заголовке
 * @returns
 */
export default function getTitle(name, buttons) {
  /**
   * Словарь всех возможных кнопок в заголовке
   */
  const buttonsDict = {
    create: (
      <AButton
        key="keyCreateAdminTableSettings"
        type="primary"
        onClick={buttons.create}
        className="space-right"
      >
        Создать
      </AButton>
    ),
    delete: (
      <AButton
        key="keyDeleteAdminTableSettings"
        danger
        onClick={buttons.delete}
        className="space-right"
      >
        Удалить
      </AButton>
    ),
    update: (
      <AButton
        key="keyUpdateAdminTableSettings"
        type="primary"
        onClick={buttons.update}
        className="space-right "
      >
        Просмотр
      </AButton>
    ),
  };

  /** Выбираем только запрошенные кнопки */
  const buttonsView = [];
  Object.keys(buttons).forEach((key) => {
    buttonsView.push(buttonsDict[key]);
  });

  return (
    <ARow>
      <ACol flex="auto">
        <ADiv className="center-text">
          <ASpan className="table-header">{name}</ASpan>
        </ADiv>
      </ACol>
      <ACol>{buttonsView}</ACol>
    </ARow>
  );
}
