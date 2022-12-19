import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { logoutAsync } from '../auth/AuthReducer'
import {
	AMenu,
	ARow,
	ACol,
	ASpan,
	AArrowLeftOutlined,
	APageHeader,
} from '../adapter'

function Header() {
	const CurrentUser = useSelector((state) => state.session.current_user)
	const { Header: ALayoutHeader } = Layout
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
			label: `${CurrentUser?.last_name} ${CurrentUser?.first_name}.${CurrentUser?.middle_name}.`,
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

	// Заменить на стор из редаксу
	function isShowIcon() {
		return location.pathname !== '/' ? (
			<AArrowLeftOutlined style={{ color: 'white' }} />
		) : (
			''
		)
	}

	return (
		<ALayoutHeader>
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
		</ALayoutHeader>
	)
}

export default Header
