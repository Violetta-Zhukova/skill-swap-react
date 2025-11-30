import type { CheckboxGroupProps } from "../shared/ui/checkbox-group/checkbox-group";
import { CheckboxGroupList } from "../shared/ui/checkbox-group/checkbox-group-list";
import { CheckboxSubgroupList } from "../shared/ui/checkbox-group/checkbox-subgroup/checkbox-subgroup-list";
import type { CheckboxType } from "../shared/ui/checkbox-group/checkbox/checkbox";

function App() {
  const items: CheckboxGroupProps[] = [
    {
      category: { id: 0, name: "Бизнес и карьера", value: "business" },
      items: [
        { id: 2, name: "name2", value: "value2" },
        { id: 1, name: "name1", value: "value1" },
      ],
    },
    {
      category: { id: 1, name: "Творчество и искусство", value: "art" },
      items: [
        { id: 2, name: "name2", value: "value2" },
        { id: 3, name: "name3", value: "value3" },
      ],
    },
    {
      category: { id: 2, name: "Иностранные языки", value: "languages" },
      items: [
        { id: 3, name: "англ", value: "eng" },
        { id: 4, name: "французский", value: "french" },
      ],
    },
    {
      category: { id: 3, name: "Дом и уют", value: "home" },
      items: [
        { id: 4, name: "name4", value: "value4" },
        { id: 5, name: "name5", value: "value5" },
        { id: 6, name: "name6", value: "value6" },
      ],
    },
  ];
  const cities: CheckboxType[] = [
    { id: 4, name: "москва", value: "value4" },
    { id: 4, name: "питер", value: "value4" },
    { id: 4, name: "екб", value: "value4" },
    { id: 4, name: "мурманск", value: "value4" },
  ];
  return (
    <>
      <CheckboxGroupList
        title="Навыки"
        items={items}
        buttonText="Все категории"
      />
      <br />
      <CheckboxSubgroupList
        title="Города"
        buttonText="Все города"
        items={cities}
        limit={2}
      />
    </>
  );
}

export default App;
