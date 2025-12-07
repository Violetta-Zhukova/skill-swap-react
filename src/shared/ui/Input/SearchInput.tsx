import React, { useState, type ChangeEvent } from "react";
import { Input } from "./Input";
import searchIcon from "../../../assets/icons/search.svg";
import style from "./style.module.css";
import { useDispatch } from "../../../features/store";
import { setFilters } from "../../../features/filters/filtersSlice";

type TSearchInputProps = {
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // name?: string;
  placeholder: string;
  // id?: string;
  // value?: string;
  // type?: string;
  // onSearch: () => void;
  className?: string;
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  TSearchInputProps
>(
  (
    {
      className = `${style.input}  ${style.input_search}`,
      // onChange,
      // onSearch,
      // name = "search-input",
      placeholder,
      // id,
      // value,
    },
    ref,
  ) => {
    const [enteredValue, setEnteredValue] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEnteredValue(event.target.value);
    };

    const handleClick = () => {
      if (enteredValue.trim()) {
        dispatch(setFilters({ searchInputValue: enteredValue }));
        console.log(`searchInputValue: ${enteredValue}`); //временно для проверки работы фильтра
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleClick();
      }
    };

    return (
      <Input
        type="text"
        className={className}
        name="search-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        placeholder={placeholder}
        // id={id}
        value={enteredValue}
      >
        <button type="button" onClick={handleClick}>
          <img src={searchIcon} alt={"Поиск"} />
        </button>
      </Input>
    );
  },
);
