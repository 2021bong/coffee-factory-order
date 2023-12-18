'use client';

import { CategoryType } from '@/types/beverageType';

export default function SelectGroup({ category }: SelectGroupProps) {
  const [cate, items] = Object.entries(category)[0];
  return (
    <optgroup label={cate}>
      {items.map((item) => (
        <option key={item.name}>{item.name}</option>
      ))}
    </optgroup>
  );
}

interface SelectGroupProps {
  category: CategoryType;
}
