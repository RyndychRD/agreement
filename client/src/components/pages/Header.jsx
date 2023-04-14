import { Layout as ALayout, Col, Menu, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageHeader } from "@ant-design/pro-layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { isAccessGranted } from "../../services/userAccessService";
import { logoutAsync } from "../../core/redux/reducers/AuthReducer";
import {
  getHeaderAlertByEnv,
  userNameMask,
} from "../../services/CommonFunctions";

/**
 * Главный хедер, отображается на всех страницах, кроме авторизации
 * К хедеру привязана логика проверки авторизован ли пользователь
 */
function Header() {
  const currentUser = useSelector((state) => state.session.current_user);
  const { Header: AHeaderLayout } = ALayout;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.session.isAuth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("isAuth: ", isAuth);
    if (!isAuth) {
      navigate("/login", {
        state: {
          prev_location: `${location.pathname}?${location.search}`.replace(
            /([?&])+/g,
            "$1"
          ),
        },
      });
    }
  }, [isAuth, location.pathname, location.search, navigate]);

  /**
   * Полный список элементов, доступных из хедера
   */
  const menuItems = [
    {
      label: userNameMask(currentUser),
      key: "user",
      children: [
        isAccessGranted("Admin")
          ? {
              label: "Админка",
              key: "admin_settings",
            }
          : "",
        {
          label: "Справка",
          key: "FAQ",
        },
        isAccessGranted("Admin")
          ? {
              label: "Справка (Админ)",
              key: "FAQ_admin",
            }
          : "",
        // {
        //   label: "Аккаунт",
        //   key: "account",
        // },
        {
          label: "Выйти",
          key: "logout",
        },
      ],
    },
  ];

  /**
   * Обработка логики клика на выпадающие элементы
   */
  const onClick = (e) => {
    switch (e.key) {
      case "logout":
        console.log("Выход из аккаунта...");
        dispatch(logoutAsync());
        break;
      case "admin_settings":
        console.log("Переход в админка...");
        navigate("/admin-settings/catalogs/departments");
        break;
      case "FAQ":
        console.log("Переход в справку для пользователя...");
        navigate("/FAQ");
        break;

      default:
        console.log("Кликнул по ", e.key);
    }
  };

  /**
   * Отображает иконку возврата на главную страницу на всех остальных страницах
   * @returns Иконка или пустая строка
   */
  function isShowIcon() {
    return location.pathname !== "/" ? (
      <ArrowLeftOutlined style={{ color: "white" }} />
    ) : (
      ""
    );
  }

  return (
    <AHeaderLayout>
      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            onBack={() => {
              navigate("/");
            }}
            backIcon={isShowIcon()}
            title={
              <span style={{ color: "white" }}>Согласование договоров</span>
            }
          />
        </Col>
        {getHeaderAlertByEnv()}
        <Col style={{ width: "200px" }}>
          <Menu
            onClick={onClick}
            theme="dark"
            mode="horizontal"
            items={menuItems}
          />
        </Col>
      </Row>
    </AHeaderLayout>
  );
}

export default Header;
