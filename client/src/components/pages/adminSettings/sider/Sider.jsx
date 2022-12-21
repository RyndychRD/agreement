import Layout from "antd/es/layout/layout"
import { AMenu } from "../../../adapter"
import { NavLink } from "react-router-dom"
import React from "react"

export function Sider() {
   const { Sider } = Layout

   /**
    * Просто более удобный вызов конструктора для элементов сайдера
    * @returns
    */
   function getItem(label, key, icon, children, type) {
      return {
         key,
         icon,
         children,
         label,
         type,
      }
   }

   /**
    * Словарь возможных линков для перехода
    * @param {string} link_key
    * @returns
    */
   function getLink(link_key) {
      const dict = {
         departments: getItem(
            <NavLink to='/admin-settings/catalogs/departments'>
               Департаменты
            </NavLink>,
            "departments"
         ),
         users: getItem(
            <NavLink to='/admin-settings/catalogs/users'>Пользователи</NavLink>,
            "users"
         ),
         positions: getItem(
            <NavLink to='/admin-settings/catalogs/positions'>
               Должности
            </NavLink>,
            "positions"
         ),
      }
      return dict[link_key] ? dict[link_key] : null
   }

   /**
    * Список отображаемых для пользователя окон с проверкой прав на доступ к этим окнам
    */
   const items = [
      getItem("Справочники", "MyCatalogs", null, [
         // eslint-disable-next-line no-constant-condition
         true ? getLink("departments") : null,
         // eslint-disable-next-line no-constant-condition
         false ? getLink("users") : null,
         // eslint-disable-next-line no-constant-condition
         true ? getLink("positions") : null,
         // eslint-disable-next-line no-constant-condition
         false ? getItem("Права", "FILL_ME") : null,
      ]),
   ]
   return (
      <Sider theme='dark' collapsible>
         <AMenu
            defaultSelectedKeys={window.location.pathname}
            className='siderMenu'
            mode='inline'
            defaultOpenKeys={["MyCatalogs"]}
            items={items}
         ></AMenu>
      </Sider>
   )
}
