const categoryColors: Record<number, string> = {
  1: "var(--tag-business-color)",
  2: "var(--tag-art-color)",
  3: "var(--tag-languages-color)",
  4: "var(--tag-education-color)",
  5: "var(--tag-home-color)",
  6: "var(--tag-health-color)",
};

export function getSubcategoryColor(subcategoryId: number) {
  let categoryId: number | undefined;

  if (subcategoryId >= 1 && subcategoryId <= 8) categoryId = 1;
  else if (subcategoryId >= 9 && subcategoryId <= 16) categoryId = 2;
  else if (subcategoryId >= 17 && subcategoryId <= 23) categoryId = 3;
  else if (subcategoryId >= 24 && subcategoryId <= 29) categoryId = 4;
  else if (subcategoryId >= 30 && subcategoryId <= 35) categoryId = 5;
  else if (subcategoryId >= 36 && subcategoryId <= 42) categoryId = 6;

  if (!categoryId) return "var(--tag-add-color)";

  return categoryColors[categoryId];
}
