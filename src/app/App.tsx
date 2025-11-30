import { useRef, useState, type ChangeEvent } from "react";
import { Input } from "../shared/ui/Input/Input";
import searchIcon from "../assets/icons/search.svg";
import eyeIcon from "../assets/icons/eye.svg";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [errors] = useState({
    email: "ошибка",
    password: "",
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <div>
      <Input
        ref={searchInputRef}
        name="search"
        value={search}
        placeholder="Поиск"
        className="search-input"
        classNameError="input_error"
        icon={{
          url: searchIcon,
          alt: "",
          className: "search__icon",
          onClick() {
            if (searchInputRef.current)
              console.log(searchInputRef.current.value);
          },
        }}
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
      />
      <form action="">
        <Input
          label="Email"
          name="email"
          value={state.email}
          type="email"
          hint={errors.email}
          isError={!!errors.email || false}
          placeholder="Введите email"
          className="input"
          classNameError="input_error"
          onChange={(e) => {
            console.log(e.target.value);
            handleEmailChange(e);
          }}
        />
        <Input
          label="Пароль"
          name="password"
          value={state.password}
          type={showPassword ? undefined : "password"}
          hint="подсказка"
          placeholder="Введите пароль"
          className=""
          classNameError="input_error"
          icon={{
            url: eyeIcon,
            alt: "показать пароль",
            className: "show-password-icon",
            onClick() {
              setShowPassword(!showPassword);
            },
          }}
          onChange={(e) => {
            console.log(e.target.value);
            handlePasswordChange(e);
          }}
        />
        <button>отправить</button>
      </form>
    </div>
  );
}

export default App;
