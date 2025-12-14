import { useMemo } from "react";
import { useSelector } from "../../features/store";
import { usersSelector } from "../../features/users/usersSlice";
//import { selectCurrentUser } from "../../features/auth/authSlice";
import { Loader } from "../../shared/ui/loader";
import { CardsGallery } from "../gallery-cards";
import type { IUser } from "../../entities/types";
import { Button } from "../../shared/ui/Button/Button";
import { Link } from "react-router-dom";
import styles from "./user-favourites.module.css";
import { getUserFavourites } from "../../shared/lib/favourites";

export function UserFavourites() {
  //const currentUser = useSelector(selectCurrentUser);
  const currentUser = "demo-user";
  const allUsers = useSelector(usersSelector);
  //const favourites = getUserFavourites(currentUser!.id.toString())
  const favourites = getUserFavourites("demoUser");
  const favouriteUsers = useMemo(() => {
    return favourites.reduce((currentArray, id) => {
      const user = allUsers.find((user) => user.id == id);
      if (user) {
        currentArray.push(user);
      }
      return currentArray;
    }, [] as IUser[]);
  }, [allUsers, favourites]);

  return !currentUser ? (
    <Loader />
  ) : favouriteUsers.length === 0 ? (
    <div className={styles.page__no_users}>
      <h1 className={styles.headline}>Избранные пользователи не найдены</h1>
      <Link to="/">
        <Button>Вернуться в каталог</Button>
      </Link>
    </div>
  ) : (
    <CardsGallery title={"Избранное"} cards={favouriteUsers}></CardsGallery>
  );
}
