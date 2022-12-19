/** @format */

import { Layout as ALayout } from 'antd'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import MainPage from './mainPage/MainPage'
import DocumentControl from './documentControl/DocumentControl'
import AdminSettings from './adminSettings/AdminSettings'

function Layout() {
	return (
		<ALayout className='layout'>
			<Header />
			<Routes>
				<Route exact path='/' element={<MainPage />} />
				<Route path='/document-control/*' element={<DocumentControl />} />
				<Route path='/admin-settings/*' element={<AdminSettings />} />
			</Routes>
		</ALayout>
	)
}

export default Layout
