import { Sidebar } from "../widgets/sidebar";
import { useDispatch } from "../features/store";
import { useEffect } from "react";

import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCities());
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Sidebar />
    </div>
  );
}

export default App;
