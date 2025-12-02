import cities from "../../../public/db/cities.json";
import categories from "../../../public/db/categories.json";

import type { OptionType } from "../ui/RadioGroup/Option";
import type { CheckboxType } from "../ui/checkbox-group/checkbox/checkbox";
import type { CheckboxGroupProps } from "../ui/checkbox-group/checkbox-group";

export const modeOptions: OptionType[] = [
  { title: "Всё", value: "all" },
  { title: "Могу научить", value: "teach" },
  { title: "Хочу научиться", value: "learn" },
];

export const genderOptions: OptionType[] = [
  { title: "Не имеет значения", value: "no_matter" },
  { title: "Мужской", value: "male" },
  { title: "Женский", value: "female" },
];

export const skillsOptions: Pick<CheckboxGroupProps, "category" | "items">[] =
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

export const citiesOptions: CheckboxType[] = cities.map((city) => ({
  ...city,
  value: city.id.toString(),
}));
