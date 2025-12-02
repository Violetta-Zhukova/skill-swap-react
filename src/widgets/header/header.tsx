import { type FC } from "react";
import { HeaderUI } from "./headerUI/headerUI";

export const Header: FC = () => {
  const isFilterEnabled = false; //нужно будет получить эту переменную динамически

  function handleSkillsClick() {
    console.log("Показать/убрать виджет ВСЕ НАВЫКИ");
  }

  return (
    <HeaderUI
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
    />
  );
};
