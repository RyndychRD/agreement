import { useCustomDispatch, useCustomState } from "./Provider"
import { ATable } from "../../adapter"
import getTitle from "./CommonFunctions"
import "./style.css"

/**
 * Конструктор таблиц для админки.
 * Для корректной работы предварительно необходимо обернуть в провайдер. Он находится в этой же папке
 * @param {Object} columns - список колонок для отображения
 * @param {string} title - Название таблицы, которое должно отображаться в заголовке
 * @param {Array<Object>} dataSource - Массив объектов для отображения в таблице. Один объект - одна строка
 * */
export default function AdminSettingsTable({
   columns = {},
   title = null,
   dataSource = null,
}) {
   const state = useCustomState()
   const dispatch = useCustomDispatch()
   /**
    * Дефолтная логика для кнопок. Пока что нет задачи изменять количество кнопок
    */
   const buttons = {
      create: () => {
         dispatch({ type: "openCreateModal" })
      },
      update: () => {
         dispatch({ type: "openUpdateModal" })
      },
      delete: () => {
         dispatch({ type: "openDeleteModal" })
      },
   }

   /**
    * Словарь всех возможных колонок для таблицы
    */
   const dictColumn = {
      department_id: { title: "ID", dataIndex: "department_id" },
      department_name: {
         title: "Наименование департамента",
         dataIndex: "department_name",
      },
   }

   /**
    * Выбрать из словаря все запрошенные колонки
    */
   const tableColumns = columns?.data.map((column) =>
      dictColumn[column] ? dictColumn[column] : null
   )

   return (
      <ATable
         key='keyAdminSettingsTable'
         columns={tableColumns}
         dataSource={dataSource}
         pagination={{ position: ["bottomCenter"] }}
         className='height-100'
         title={() => getTitle(title, buttons)}
         onRow={(row) => ({
            // Выбираем текущую строку
            onClick: () => {
               dispatch({ type: "closeAllModal" })
               dispatch({
                  type: "selectRow",
                  currentRow: row,
               })
            },
            // Двойной клик всегда срабатывает после одинарного
            onDoubleClick: () => {
               dispatch({ type: "openUpdateModal" })
            },
         })}
         rowClassName={(row) => {
            if (row.key === state?.currentRow?.key) {
               return "ant-table-row ant-table-row-level-0 selected-table-row"
            }
            return "ant-table-row ant-table-row-level-0"
         }}
      />
   )
}
