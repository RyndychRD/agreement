import { Layout as ALayout } from 'antd'
import React from 'react'
import {
	AMenu,
	ARow,
	ACol,
	ASpan,
	AArrowLeftOutlined,
	APageHeader,
} from '../adapter'
import { logoutAsync } from '../auth/AuthReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Header() {
	const current_user = useSelector((state) => state.session.current_user)
	const { Header } = ALayout
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.session.isAuth)
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		console.log('isAuth: ', isAuth)
		if (!isAuth) {
			navigate('/login')
		}
	}, [isAuth, navigate])

	const menuItems = [
		{
			label: `${current_user?.last_name} ${current_user?.first_name}.${current_user?.middle_name}.`,
			key: 'user',
			children: [
				{
					label: 'Админка',
					key: 'admin_settings',
				},
				{
					label: 'Справка',
					key: 'FAQ',
				},
				{
					label: 'Справка (Админ)',
					key: 'FAQ_admin',
				},
				{
					label: 'Аккаунт',
					key: 'account',
				},
				{
					label: 'Выйти',
					key: 'logout',
				},
			],
		},
	]

	const onClick = (e) => {
		switch (e.key) {
			case 'logout':
				console.log('Выход из аккаунта...')
				dispatch(logoutAsync())
				break
			case 'admin_settings':
				console.log('Переход в админку...')
				navigate('/admin-settings/catalogs/departments')
				break

			default:
				console.log('Кликнул по ', e.key)
		}
	}

	//Заменить на стор из редаксу
	function isShowIcon() {
		return location.pathname !== '/' ? (
			<AArrowLeftOutlined style={{ color: 'white' }} />
		) : (
			''
		)
	}

	return (
		<Header>
			<ARow justify="space-between" align="middle">
				<ACol>
					<APageHeader
						onBack={() => {
							navigate('/')
						}}
						backIcon={isShowIcon()}
						title={
							<ASpan style={{ color: 'white' }}>Согласование договоров</ASpan>
						}
					/>
				</ACol>
				<ACol style={{ width: '125px' }}>
					<AMenu
						onClick={onClick}
						theme="dark"
						mode="horizontal"
						items={menuItems}
					/>
				</ACol>
			</ARow>
		</Header>
	)
}

export default Header
