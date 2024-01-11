import { CategoryType } from '@/types/utilType';

const beverageMenu: CategoryType[] = [
  {
    drinkType: 'coffee',
    drink: [
      { name: '아메리카노', selected: false },
      { name: '아메리카노연하게', selected: false },
      { name: '카페라떼', selected: false },
      { name: '오늘의커피', selected: true },
      { name: '오늘의커피연하게', selected: true },
      { name: '오늘의라떼', selected: false },
      { name: '아인슈페너', selected: false },
      { name: '바닐라봉봉', selected: false },
      { name: '허니오트폼라떼', selected: false },
      { name: '허니오트폼라떼덜달게연하게', selected: false },
    ],
  },
  {
    drinkType: 'non-coffee',
    drink: [
      { name: '자몽에이드', selected: false },
      { name: '청귤차', selected: false },
      { name: '얼그레이', selected: false },
      { name: '카모마일', selected: false },
      { name: '루이보스', selected: false },
    ],
  },
  {
    drinkType: 'etc',
    drink: [
      { name: '기타', selected: false },
      { name: '괜찮습니다', selected: false },
    ],
  },
];

export default beverageMenu;
