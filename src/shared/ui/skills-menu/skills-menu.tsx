import styles from "./skills-menu.module.css";
import { CategoryIcon } from "./category-icon";

type Category = {
  id: number;
  name: string;
  subcategories: Array<{ id: number; name: string }>;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Бизнес и карьера",
    subcategories: [
      { id: 1, name: "Управление командой" },
      { id: 2, name: "Маркетинг и реклама" },
      { id: 3, name: "Продажи и переговоры" },
      { id: 4, name: "Личный бренд" },
      { id: 5, name: "Резюме и собеседование" },
      { id: 6, name: "Тайм-менеджмент" },
      { id: 7, name: "Проектное управление" },
      { id: 8, name: "Предпринимательство" },
    ],
  },
  {
    id: 2,
    name: "Творчество и искусство",
    subcategories: [
      { id: 9, name: "Рисование и иллюстрация" },
      { id: 10, name: "Фотография" },
      { id: 11, name: "Видеомонтаж" },
      { id: 12, name: "Музыка и звук" },
      { id: 13, name: "Актёрское мастерство" },
      { id: 14, name: "Креативное письмо" },
      { id: 15, name: "Арт-терапия" },
      { id: 16, name: "Декор и DIY" },
    ],
  },
  {
    id: 3,
    name: "Иностранные языки",
    subcategories: [
      { id: 17, name: "Английский" },
      { id: 18, name: "Французский" },
      { id: 19, name: "Испанский" },
      { id: 20, name: "Немецкий" },
      { id: 21, name: "Китайский" },
      { id: 22, name: "Японский" },
      { id: 23, name: "Подготовка к экзаменам (IELTS, TOEFL)" },
    ],
  },
  {
    id: 4,
    name: "Образование и развитие",
    subcategories: [
      { id: 24, name: "Личностное развитие" },
      { id: 25, name: "Навыки обучения" },
      { id: 26, name: "Когнитивные техники" },
      { id: 27, name: "Скорочтение" },
      { id: 28, name: "Навыки преподавания" },
      { id: 29, name: "Коучинг" },
    ],
  },
  {
    id: 5,
    name: "Дом и уют",
    subcategories: [
      { id: 30, name: "Уборка и организация" },
      { id: 31, name: "Домашние финансы" },
      { id: 32, name: "Приготовление еды" },
      { id: 33, name: "Домашние растения" },
      { id: 34, name: "Ремонт" },
      { id: 35, name: "Хранение вещей" },
    ],
  },
  {
    id: 6,
    name: "Здоровье и лайфстайл",
    subcategories: [
      { id: 36, name: "Йога и медитация" },
      { id: 37, name: "Питание и ЗОЖ" },
      { id: 38, name: "Ментальное здоровье" },
      { id: 39, name: "Осознанность" },
      { id: 40, name: "Физические тренировки" },
      { id: 41, name: "Сон и восстановление" },
      { id: 42, name: "Баланс жизни и работы" },
    ],
  },
];

const leftColumnCategories = categories.filter(
  (cat) =>
    cat.name === "Бизнес и карьера" ||
    cat.name === "Иностранные языки" ||
    cat.name === "Дом и уют",
);

const rightColumnCategories = categories.filter(
  (cat) =>
    cat.name === "Творчество и искусство" ||
    cat.name === "Образование и развитие" ||
    cat.name === "Здоровье и лайфстайл",
);

export const SkillsMenu = () => {
  return (
    <div className={styles.skillsMenu}>
      <div className={styles.columns}>
        <div className={styles.column}>
          {leftColumnCategories.map((category) => (
            <div key={category.id} className={styles.category}>
              <div className={styles.categoryIconContainer}>
                <CategoryIcon categoryName={category.name} />
              </div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <ul className={styles.subcategories}>
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className={styles.subcategory}>
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.column}>
          {rightColumnCategories.map((category) => (
            <div key={category.id} className={styles.category}>
              <div className={styles.categoryIconContainer}>
                <CategoryIcon categoryName={category.name} />
              </div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <ul className={styles.subcategories}>
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className={styles.subcategory}>
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
