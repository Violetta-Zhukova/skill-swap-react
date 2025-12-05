import cities from "../../../public/db/cities.json";
import categories from "../../../public/db/categories.json";

import type { TOptionType } from "../ui/RadioGroup/Option";
import type { TCheckboxType } from "../ui/checkbox-group/checkbox/checkbox";
import type { TCheckboxGroupProps } from "../ui/checkbox-group/checkbox-group";

export const categoryColors: Record<number, string> = {
  1: "var(--tag-business-color)",
  2: "var(--tag-art-color)",
  3: "var(--tag-languages-color)",
  4: "var(--tag-education-color)",
  5: "var(--tag-home-color)",
  6: "var(--tag-health-color)",
};

export const modeOptions: TOptionType[] = [
  { title: "Всё", value: "all" },
  { title: "Могу научить", value: "teach" },
  { title: "Хочу научиться", value: "learn" },
];

export const genderOptions: TOptionType[] = [
  { title: "Не имеет значения", value: "no_matter" },
  { title: "Мужской", value: "male" },
  { title: "Женский", value: "female" },
];

export const skillsOptions: Pick<TCheckboxGroupProps, "category" | "items">[] =
  categories.map((cat) => ({
    category: {
      id: cat.id,
      name: cat.name,
      value: cat.id.toString(),
    },
    items: cat.subcategories.map((sub) => ({
      ...sub,
      value: sub.id.toString(),
    })),
  }));

export const citiesOptions: TCheckboxType[] = cities.map((city) => ({
  ...city,
  value: city.id.toString(),
}));
