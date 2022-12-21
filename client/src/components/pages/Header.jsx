import { Layout as ALayout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logoutAsync } from "../auth/AuthReducer";
import {
  AMenu,
  ARow,
  ACol,
  ASpan,
  AArrowLeftOutlined,
  APageHeader,
} from "../adapter";

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
      navigate("/login");
    }
  }, [isAuth, navigate]);

  /**
   * Полный список элементов, доступных из хедера
   */
  const menuItems = [
    {
      label: `${currentUser?.last_name} ${currentUser?.first_name}.${currentUser?.middle_name}.`,
      key: "user",
      children: [
        {
          label: "Админка",
          key: "admin_settings",
        },
        {
          label: "Справка",
          key: "FAQ",
        },
        {
          label: "Справка (Админ)",
          key: "FAQ_admin",
        },
        {
          label: "Аккаунт",
          key: "account",
        },
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
      <ARow justify="space-between" align="middle">
        <ACol>
          <APageHeader
            onBack={() => {
              navigate("/");
            }}
            backIcon={isShowIcon()}
            title={
              <ASpan style={{ color: "white" }}>Согласование договоров</ASpan>
            }
          />
        </ACol>
        <ACol style={{ width: "125px" }}>
          <AMenu
            onClick={onClick}
            theme="dark"
            mode="horizontal"
            items={menuItems}
          />
        </ACol>
      </ARow>
    </AHeaderLayout>
  );
}

export default Header;
