import { Layout as ALayout, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { isAccessGranted } from "../../services/userAccessService";
import { logoutAsync } from "../../core/redux/reducers/AuthReducer";
import {
  getHeaderAlertByEnv,
  userNameMask,
} from "../../services/CommonFunctions";
import { AMenu, ASpan, AArrowLeftOutlined, APageHeader } from "../adapter";
/**
 * Главный хедер, отображается на всех страницах, кроме авторизации
 * К хедеру привязана логика проверки авторизован ли пользователь
 */
function Header() {
  const currentUser = useSelector((state) => state.session.current_user);
  const { Header: AHeaderLayout } = ALayout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      <AArrowLeftOutlined style={{ color: "white" }} />
    ) : (
      ""
    );
  }

  return (
    <AHeaderLayout>
      <Row justify="space-between" align="middle">
        <Col>
          <APageHeader
            onBack={() => {
              navigate("/");
            }}
            backIcon={isShowIcon()}
            title={
              <ASpan style={{ color: "white" }}>Согласование договоров</ASpan>
            }
          />
        </Col>
        {getHeaderAlertByEnv()}
        <Col style={{ width: "200px" }}>
          <AMenu
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
