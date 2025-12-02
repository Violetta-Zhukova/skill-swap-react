import styles from "./headerUI.module.css";
import moon from "./../../../assets/icons/moon.svg";
import type { FC } from "react";
import { Logo } from "../../../shared/ui/logo";
import { ArrowIcon } from "../../../assets/img/icons";
import { SearchInput } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button/Button";

type THeaderUIProps = {
  isFilterEnabled: boolean;
  handleSkillsClick: () => void;
};

export const HeaderUI: FC<THeaderUIProps> = ({
  isFilterEnabled,
  handleSkillsClick,
}) => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.menu}>
          <Logo />
          <ul className={styles.list}>
            <li>О проекте</li>
            <li>
              <button className={styles.skills} onClick={handleSkillsClick}>
                <p>Все навыки</p>
                <div className={styles.icon}>
                  <ArrowIcon initialRotation={0} opened={false} />
                </div>
              </button>
            </li>
          </ul>
          {!isFilterEnabled && (
            <div className={styles.input}>
              <SearchInput
                onChange={() => {}}
                name={"Искать навык"}
                onSearch={() => {}}
              />
            </div>
          )}
          <img src={moon} className={styles.icon} />
          <ul className={styles.buttons}>
            <li>
              <Button onClick={() => {}} type={"secondary"}>
                {"Войти"}
              </Button>
            </li>
            <li>
              <Button onClick={() => {}}>{"Зарегистрироваться"}</Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
