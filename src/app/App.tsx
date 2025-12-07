import { Header } from "../widgets/header";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { Footer } from "../widgets/footer";
import { useSelector } from "../features/store";
import { getFilteredUsers } from "../entities/get-filtered-users";
import usersExample from "../../public/db/users.json";
import type { IUser } from "../entities/types";

function App() {
  //проверка работы фильтрации по строке поиска через консоль
  const users = usersExample as IUser[];
  const filters = useSelector((state) => state.filters.filters);
  const filteredUsers = getFilteredUsers(users, filters);
  console.log(`filteredUsers:`, filteredUsers);

  return (
    <>
      <Header />
      <NotFound404 />
      <Footer />
    </>
  );
}

export default App;
