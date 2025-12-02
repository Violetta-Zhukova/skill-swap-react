import style from "./sidebar.module.css";
import { RadioGroup } from "../../shared/ui/RadioGroup/RadioGroup";
import {
  CheckboxGroupList,
  CheckboxSubgroupList,
} from "../../shared/ui/checkbox-group";
import type { CheckboxType } from "../../shared/ui/checkbox-group/checkbox/checkbox";
import type { CheckboxGroupProps } from "../../shared/ui/checkbox-group/checkbox-group";

import cities from "../../../public/db/cities.json";
import categories from "../../../public/db/categories.json";

import type { Filters } from "../../entities/types";
import type { OptionType } from "../../shared/ui/RadioGroup/Option";

import { CrossIcon } from "../../assets/img/icons";

import { useState } from "react";

export const Sidebar = () => {
  const [chosenMode, setChosenMode] = useState<Filters["mode"]>("all");
  const [chosenGender, setChosenGender] =
    useState<Filters["gender"]>("no_matter");
  const [chosenCities, setChosenCities] = useState<Filters["cityIds"]>([]);
  const [chosenSkills, setChosenSkills] = useState<Filters["skillIds"]>([]);

  const modeOptions: OptionType[] = [
    { title: "Всё", value: "all" },
    { title: "Могу научить", value: "teach" },
    { title: "Хочу научиться", value: "learn" },
  ];

  const genderOptions: OptionType[] = [
    { title: "Не имеет значения", value: "no_matter" },
    { title: "Мужской", value: "male" },
    { title: "Женский", value: "female" },
  ];

  const skillsOptions: CheckboxGroupProps[] = categories.map((cat) => ({
    category: {
      id: cat.id,
      name: cat.name,
      value: cat.id.toString(),
    },
    items: cat.subcategories.map((sub) => ({
      ...sub,
      value: sub.id.toString(),
    })),
    selectedItems: cat.subcategories
      .map((sub) => ({
        ...sub,
        value: sub.id.toString(),
      }))
      .filter((item) => chosenSkills.includes(item.id)),
    handleSubItemChange: ({ id }: CheckboxType) => {
      setChosenSkills((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
      );
    },
  }));

  const citiesOptions: CheckboxType[] = cities.map((city) => ({
    ...city,
    value: city.id.toString(),
  }));

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_title}>
        <p className={style.sidebar_title_text}>
          Фильтры
          {(chosenCities.length > 0 || chosenSkills.length > 0) &&
            ` (${chosenSkills.length + chosenCities.length})`}
        </p>
        {(chosenCities.length > 0 || chosenSkills.length > 0) && (
          <button
            className={style.reset_button}
            onClick={() => {
              setChosenCities([]);
              setChosenSkills([]);
            }}
          >
            Сбросить{<CrossIcon />}
          </button>
        )}
      </div>
      <div className={style.sidebar_content}>
        <RadioGroup
          name="mode"
          title=""
          options={modeOptions}
          selected={
            modeOptions.find(({ value }) => value === chosenMode) ||
            modeOptions[0]
          }
          onChange={(option) => setChosenMode(option.value as Filters["mode"])}
        />
        <CheckboxGroupList
          title="Навыки"
          buttonText="Все категории"
          limit={5}
          items={skillsOptions}
        />
        <RadioGroup
          name="gender"
          title="Пол автора"
          options={genderOptions}
          selected={
            genderOptions.find(({ value }) => value === chosenGender) ||
            genderOptions[0]
          }
          onChange={(option) =>
            setChosenGender(option.value as Filters["gender"])
          }
        />
        <CheckboxSubgroupList
          title="Города"
          buttonText="Все города"
          limit={5}
          items={citiesOptions}
          selectedItems={citiesOptions.filter((item) =>
            chosenCities.includes(item.id)
          )}
          handleSubItemChange={({ id }: CheckboxType) => {
            setChosenCities((prev) =>
              prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            );
          }}
        />
      </div>
    </div>
  );
};
