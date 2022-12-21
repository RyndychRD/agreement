/** @format */

import { ARow, ACol, ASpan, ADiv, AButton } from "../../adapter";

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
