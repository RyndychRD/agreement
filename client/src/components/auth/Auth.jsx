/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Button, Col, Input, Row, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  refreshAsync,
  loginAsync,
} from "../../core/redux/reducers/AuthReducer";
import "./style.css";

function Auth() {
  const isAuth = useSelector((state) => state.session.isAuth);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isAuth) {
      if (location.state?.prev_location) {
        navigate(location.state.prev_location);
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, navigate]);

  // Если до этого авторизовались и сессия не истекла пробуем войти автоматически
  useEffect(() => {
    // Изымаем из локального хранилища токен обновление если есть пробуем входить
    console.log("Проверяем была ли авторизация");
    if (localStorage.getItem("token")) {
      console.log("Авторизация была, попытка обновить токен");
      dispatch(refreshAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row justify="center" align="middle" style={{ height: "95vh" }}>
      <Col>
        {isAuth && showAlert && (
          <Alert
            showIcon
            type="success"
            message="Сообщение"
            description="Авторизация прошла успешно..."
          />
        )}
        {!isAuth && showAlert && (
          <Alert
            showIcon
            type="error"
            message="Ошибка"
            description="Неверный логин или пароль."
          />
        )}
        <Form
          name="basic"
          onFinish={(value) => {
            setShowAlert(true);
            dispatch(loginAsync(value));
          }}
        >
          <Row gutter={16}>
            <Col>
              <span className="authorizationHeader">АВТОРИЗАЦИЯ</span>
              <Form.Item
                name="login"
                rules={[
                  {
                    required: true,
                    message: "Необходимо для заполнения!",
                  },
                ]}
              >
                <Input
                  className="loginFormName"
                  placeholder="Имя пользователя"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Необходимо для заполнения!",
                  },
                ]}
              >
                <Input.Password
                  className="loginFormPassword"
                  placeholder="Пароль"
                  // eslint-disable-next-line react/no-unstable-nested-components
                  iconRender={(isVisible) =>
                    isVisible ? (
                      <EyeTwoTone
                        style={{ color: "#fff" }}
                        className="loginIcons"
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        style={{ color: "#fff" }}
                        className="loginIcons"
                      />
                    )
                  }
                />
              </Form.Item>
              <Form.Item className="loginFormItem">
                <Button
                  className="login_btn"
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Войти
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Auth;
