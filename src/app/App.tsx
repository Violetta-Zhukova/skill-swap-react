import { useEffect, useState } from "react";
import type { User } from "../entities/types";
import { api } from "../api";
import { UserCard } from "../widgets/UserCard/UserCard";
import styles from "./App.module.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.getAllUsers().then(setUsers);
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.cardsGrid}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}

export default App;
