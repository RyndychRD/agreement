import {
	ACol,
	AForm,
	AFormItem,
	AInput,
	AInputPassword,
	ARow,
	AEyeTwoTone,
	AButton,
	AEyeInvisibleOutlined,
	ASpan,
	AAlert,
} from '../adapter'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import { loginAsync, AuthCheckAsync } from './AuthReducer'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
	const isAuth = useSelector((state) => state.session.isAuth)
	const dispatch = useDispatch()
	const [showAlert, setShowAlert] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		if (isAuth) navigate('/')
	}, [isAuth, navigate])

	//Если до этого авторизовались и сессия не истекла пробуем войти автоматически
	useEffect(() => {
		//Изымаем из локального хранилища токен обновление если есть пробуем входить
		if (localStorage.getItem('token')) {
			console.log('Проверяем была ли авторизация')
			console.log('Авторизация была, попытка обновить токен')
			dispatch(AuthCheckAsync())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<ARow justify="center" align="middle" style={{ height: '95vh' }}>
			<ACol>
				{isAuth && showAlert && (
					<AAlert
						showIcon
						type="success"
						message={'Сообщение'}
						description={`Авторизация прошла успешно...`}
					/>
				)}
				{!isAuth && showAlert && (
					<AAlert
						showIcon
						type="error"
						message={'Ошибка'}
						description={`Неверный логин или пароль.`}
					/>
				)}
				<AForm
					name="basic"
					onFinish={(value) => {
						setShowAlert(true)
						dispatch(loginAsync(value))
					}}
				>
					<ARow gutter={16}>
						<ACol>
							<ASpan className="authorizationHeader">АВТОРИЗАЦИЯ</ASpan>
							<AFormItem
								name="login"
								rules={[
									{
										required: true,
										message: 'Необходимо для заполнения!',
									},
								]}
							>
								<AInput
									className="loginFormName"
									placeholder="Имя пользователя"
								/>
							</AFormItem>
							<AFormItem
								name="password"
								rules={[
									{
										required: true,
										message: 'Необходимо для заполнения!',
									},
								]}
							>
								<AInputPassword
									className="loginFormPassword"
									placeholder="Пароль"
									iconRender={(isVisible) =>
										isVisible ? (
											<AEyeTwoTone
												style={{ color: '#fff' }}
												className="loginIcons"
											/>
										) : (
											<AEyeInvisibleOutlined
												style={{ color: '#fff' }}
												className="loginIcons"
											/>
										)
									}
								/>
							</AFormItem>
							<AFormItem className="loginFormItem">
								<AButton className="login_btn" htmlType="submit">
									Войти
								</AButton>
							</AFormItem>
						</ACol>
					</ARow>
				</AForm>
			</ACol>
		</ARow>
	)
}

export default Auth
