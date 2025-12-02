import style from "./sidebar.module.css";
import { RadioGroup } from "../../shared/ui/RadioGroup/RadioGroup";
import {
  CheckboxGroupList,
  CheckboxSubgroupList,
} from "../../shared/ui/checkbox-group";
import type { CheckboxType } from "../../shared/ui/checkbox-group/checkbox/checkbox";
import type { CheckboxGroupProps } from "../../shared/ui/checkbox-group/checkbox-group";
import type { Filters } from "../../entities/types";

import { CrossIcon } from "../../assets/img/icons";
import {
  modeOptions,
  genderOptions,
  skillsOptions,
  citiesOptions,
} from "../../shared/lib/constants";

import { useState } from "react";

export const Sidebar = () => {
  const initialFilters: Filters = {
    mode: "all",
    gender: "no_matter",
    skillIds: [],
    cityIds: [],
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const skillsOptionsExtended: CheckboxGroupProps[] = skillsOptions.map(
    (item) => ({
      ...item,
      selectedItems: item.items.filter((it) =>
        filters.skillIds.includes(it.id),
      ),
      handleSubItemChange: ({ id }: CheckboxType) => {
        setFilters((prev) => ({
          ...prev,
          skillIds: prev.skillIds.includes(id)
            ? prev.skillIds.filter((v) => v !== id)
            : [...prev.skillIds, id],
        }));
      },
    }),
  );

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_title}>
        <p className={style.sidebar_title_text}>
          Фильтры
          {(filters.cityIds.length > 0 || filters.skillIds.length > 0) &&
            ` (${filters.skillIds.length + filters.cityIds.length})`}
        </p>
        {(filters.cityIds.length > 0 || filters.skillIds.length > 0) && (
          <button
            className={style.reset_button}
            onClick={() => setFilters(initialFilters)}
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
            modeOptions.find(({ value }) => value === filters.mode) ||
            modeOptions[0]
          }
          onChange={(option) =>
            setFilters((prev) => ({
              ...prev,
              mode: option.value as Filters["mode"],
            }))
          }
        />
        <CheckboxGroupList
          title="Навыки"
          buttonText="Все категории"
          limit={5}
          items={skillsOptionsExtended}
        />
        <RadioGroup
          name="gender"
          title="Пол автора"
          options={genderOptions}
          selected={
            genderOptions.find(({ value }) => value === filters.gender) ||
            genderOptions[0]
          }
          onChange={(option) =>
            setFilters((prev) => ({
              ...prev,
              gender: option.value as Filters["gender"],
            }))
          }
        />
        <CheckboxSubgroupList
          title="Города"
          buttonText="Все города"
          limit={5}
          items={citiesOptions}
          selectedItems={citiesOptions.filter((item) =>
            filters.cityIds.includes(item.id),
          )}
          handleSubItemChange={({ id }: CheckboxType) => {
            setFilters((prev) => ({
              ...prev,
              cityIds: prev.cityIds.includes(id)
                ? prev.cityIds.filter((v) => v !== id)
                : [...prev.cityIds, id],
            }));
          }}
        />
      </div>
    </div>
  );
};
