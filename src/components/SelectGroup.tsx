'use client';

import { CategoryType } from '@/types/beverageType';

export default function SelectGroup({ category }: SelectGroupProps) {
  const [categoryName, categoryItems] = Object.entries(category)[0];
  if (!category || Object.keys(category).length === 0) {
    return null;
  }
  return (
    <optgroup label={categoryName}>
      {categoryItems.map((item) => (
        <option key={item.name}>{item.name}</option>
      ))}
    </optgroup>
  );
}

interface SelectGroupProps {
  category: CategoryType;
}
