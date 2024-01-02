'use client';

import { CategoryType } from '@/types/utilType';

export default function SelectGroup({ category }: { category: CategoryType }) {
  const { drinkType, drink } = category;
  if (!category || drink.length === 0) {
    return null;
  }
  return (
    <optgroup label={drinkType}>
      {drink.map((item) => (
        <option key={item.name}>{item.name}</option>
      ))}
    </optgroup>
  );
}
