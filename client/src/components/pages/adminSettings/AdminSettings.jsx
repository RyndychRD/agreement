import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import AdminSider from "./sider/AdminSider"
import Catalogs from "./catalogs/Catalogs"

/**
 * Главный компонент, который хранит все элементы админки
 */
export default function AdminSettings() {
   const { Content } = Layout
   return (
      <Layout>
         <AdminSider />
         <Content className='content'>
            <Routes>
               <Route path='/catalogs/*' element={<Catalogs />} />
            </Routes>
         </Content>
      </Layout>
   )
}
