import { CategoryType } from '@/types/beverageType';

const beverageMenu: CategoryType[] = [
  {
    // todo
    // drinkType: 커피
    // drink: 음료 배열
    coffee: [
      { name: '오늘의커피', selected: true },
      { name: '아메리카노', selected: false },
      { name: '아메리카노연하게', selected: false },
      { name: '오늘의라떼', selected: false },
      { name: '허니오트폼라떼', selected: false },
    ],
  },
  { nonCoffee: [{ name: '얼그레이', selected: false }] },
  {
    etc: [
      { name: '기타', selected: false },
      { name: '괜찮습니다', selected: false },
    ],
  },
];

export default beverageMenu;
