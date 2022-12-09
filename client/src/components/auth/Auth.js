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
} from "../adapter";
import { useDispatch } from "react-redux";
import "./style.css";
import { createSession } from "./AuthReducer";

function Auth() {
	const dispatch = useDispatch();
	const logIntoSystem = (values) => {
		dispatch(createSession(values));
	};
	return (
		<ARow justify="center" align="middle" style={{ height: "95vh" }}>
			<ACol>
				<AForm name="basic" onFinish={logIntoSystem}>
					<ARow gutter={16}>
						<ACol>
							<ASpan className="authorizationHeader">АВТОРИЗАЦИЯ</ASpan>
							<AFormItem
								name="username"
								rules={[
									{
										required: true,
										message: "Необходимо для заполнения!",
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
										message: "Необходимо для заполнения!",
									},
								]}
							>
								<AInputPassword
									className="loginFormPassword"
									placeholder="Пароль"
									iconRender={(isVisible) =>
										isVisible ? (
											<AEyeTwoTone
												style={{ color: "#fff" }}
												className="loginIcons"
											/>
										) : (
											<AEyeInvisibleOutlined
												style={{ color: "#fff" }}
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
	);
}

export default Auth;
