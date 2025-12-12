import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { SkillPage } from "../pages/skill-page";
import { useDispatch, useSelector } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { PopupMenu } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { Login } from "../pages/login";
import { UserDataRegForm } from "../widgets/user-data-reg-form";
import { ProfileAvatar } from "../pages/profile/personal-data/avatar";
import { useRegistrationAvatar } from "../shared/hooks/useRegistrationAvatar";

function App() {
  const dispatch = useDispatch();
  const { commitAvatar, discardAvatar } = useRegistrationAvatar(); // удалить только commitAvatar после проверки

  const { users } = useSelector((store) => store.users);

  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const openPopup = () => {
    discardAvatar();
    setPopupIsOpen(true);
    if (headerRef.current)
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  const closePopup = () => setPopupIsOpen(false);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header ref={headerRef} handleSkillsClick={openPopup} />
      <UserDataRegForm></UserDataRegForm> {/* удалить после проверки */}
      <ProfileAvatar></ProfileAvatar> {/* удалить после проверки */}
      <button onClick={() => commitAvatar()}> Добавить аватар</button>{" "}
      {/* удалить после проверки */}
      <button onClick={() => discardAvatar()}> Удалить аватар</button>{" "}
      {/* удалить после проверки */}
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="login" element={<Login />} />
          <Route
            path="skill/:id"
            element={<SkillPage similarUsers={users.slice(1, 9)} />}
          />
        </Routes>
      </main>
      <Footer allSkillsOnClick={openPopup} />
      <PopupMenu
        anchorRef={headerRef}
        isOpen={popupIsOpen}
        onClose={closePopup}
      >
        <SkillsMenu />
      </PopupMenu>
    </div>
  );
}

export default App;
