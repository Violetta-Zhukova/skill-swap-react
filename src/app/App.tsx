// app.tsx
import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { SkillPage } from "../pages/skill-page";
import { useDispatch } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { PopupMenu, type PopupMenuPosition } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { HeaderMenuAvatarContent } from "../widgets/header-popup-widget/header-menu-avatar-content";
import { NotificationsMenu } from "../widgets/notifications-menu";
import { Login } from "../pages/login";
import { fetchUserData } from "../features/auth/authSlice";

// Тип для контента попапа
type PopupContent = "skills" | "avatar" | "notifications" | null;

function App() {
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLElement>(null);

  // Единое состояние для управления попапом
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    content: PopupContent;
    position: PopupMenuPosition;
  }>({
    isOpen: false,
    content: null,
    position: "bottom-left",
  });

  // Функция открытия попапа с навыками
  const openSkillsPopup = () => {
    setPopupState({
      isOpen: true,
      content: "skills",
      position: "bottom-left",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // Функция открытия попапа с аватаром
  const openAvatarPopup = () => {
    setPopupState({
      isOpen: true,
      content: "avatar",
      position: "bottom-right",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // Функция открытия попапа с уведомлениями
  const openNotificationsPopup = () => {
    setPopupState({
      isOpen: true,
      content: "notifications",
      position: "bottom-right",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // Функция закрытия попапа
  const closePopup = () => {
    setPopupState({
      isOpen: false,
      content: null,
      position: "bottom-left",
    });
  };

  // Рендер контента в зависимости от типа
  const renderPopupContent = () => {
    switch (popupState.content) {
      case "skills":
        return <SkillsMenu />;
      case "avatar":
        return <HeaderMenuAvatarContent />;
      case "notifications":
        return <NotificationsMenu />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header
        ref={headerRef}
        handleSkillsClick={openSkillsPopup}
        onProfileClick={openAvatarPopup}
        onNotificationsClick={openNotificationsPopup}
      />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="login" element={<Login />} />
          <Route path="skill/:id" element={<SkillPage />} />
        </Routes>
      </main>
      <Footer allSkillsOnClick={openSkillsPopup} />

      {/* Единый попап */}
      <PopupMenu
        anchorRef={headerRef}
        isOpen={popupState.isOpen}
        onClose={closePopup}
        position={popupState.position}
      >
        {renderPopupContent()}
      </PopupMenu>
    </div>
  );
}

export default App;
