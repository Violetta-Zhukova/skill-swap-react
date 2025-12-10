import { type FC } from "react";
import { HeaderElement } from "./header-element/header-element";
import { useSelector } from "../../features/store";
import { selectCurrentUser } from "../../features/auth/authSlice";

type THeaderProps = {
  handleSkillsClick?: () => void;
  ref?: React.Ref<HTMLElement>;
};

export const Header: FC<THeaderProps> = ({ handleSkillsClick, ref }) => {
  const isFilterEnabled = false; //нужно будет получить эту переменную динамически
  const currentUser = useSelector(selectCurrentUser) || null;

  const handleLogin = () => {
    console.log("Логин");
  };

  const handleProfileClick = () => {
    console.log("Переход в профиль пользователя");
  };

  return (
    <HeaderElement
      ref={ref}
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
      user={currentUser}
      onLogin={handleLogin}
      onProfileClick={handleProfileClick}
    />
  );
};
