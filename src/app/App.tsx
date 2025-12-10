import { useEffect } from "react";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";

import { useDispatch } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { UserDataRegForm } from "../widgets/user-data-reg-form";
import { ProfileAvatar } from "../pages/profile/personal-data/avatar";

import ImageUploader from "../widgets/image-upload-widget/image-upload-widget";
import { ImagesAuthorSlider } from "../widgets/slider/images-author-slider/images-author-slider";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <UserDataRegForm></UserDataRegForm>
        <ProfileAvatar></ProfileAvatar>
        <ImageUploader></ImageUploader>
        <ImagesAuthorSlider></ImagesAuthorSlider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
