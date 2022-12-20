import React, { useContext } from "react"
import { ATable } from "../../adapter"
import { CustomDispatchContext, CustomStateContext } from "./../../pages/adminSettings/catalogs/departments/Provider"
import { getColumn, getTitle } from "./CommonFunctions"
import "./style.css"

const buttonDefault = {
   create: () => {
      console.log("Create button pushed, no action provided")
   },
   update: () => {
      console.log("Update button pushed, no action provided")
   },
   delete: () => {
      console.log("Delete button pushed, no action provided")
   },
}


export default function AdminSettingsTable({   
   columns = {},
   title = null,
   buttons = buttonDefault,
   dataSource = null,
}) {

   const state = useContext(CustomStateContext)
   const dispatch = useContext(CustomDispatchContext)


   const dictColumn = {
      department_id: getColumn("ID", "department_id"),
      department_name: getColumn(
         "Наименование департамента",
         "department_name"
      ),
   }

   const tableColumns = columns?.data.map((column) => {
      return dictColumn[column] ? dictColumn[column] : null
   })

   return (
      <ATable
         key="keyAdminSettingsTable"
         columns={tableColumns}
         dataSource={dataSource}
         pagination={{ position: ["bottomCenter"] }}
         className="height-100"
         title={() => getTitle(title, buttons)}
         onRow={(row) => {
            return {
               onClick: () => {                  
                  dispatch({
                           type: "selectRow",
                           currentRow: row,
                        })
               },
               onDoubleClick: (event) => {
                  dispatch({
                     type: "selectRow",
                     currentRow: row,
                  })
               },
            }
         }}
         rowClassName={(row) => {
            if (row.key === state?.currentRow?.key) {
               console.log("Изменен класс")
               return "ant-table-row ant-table-row-level-0 selected-table-row"
            }
            return "ant-table-row ant-table-row-level-0"
         }}
      />
   )
}
