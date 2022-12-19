import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import Sider from './sider/Sider'
import Catalogs from './catalogs/Catalogs'

export default function AdminSettings() {
	const { Content } = Layout
	return (
		<Layout>
			<Sider />
			<Content className="content">
				<Routes>
					<Route path="/catalogs/*" element={<Catalogs />} />
				</Routes>
			</Content>
		</Layout>
	)
}
