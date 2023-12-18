export type CategoryType =
  | {
      coffee: { name: string; selected: boolean }[];
    }
  | {
      nonCoffee: { name: string; selected: boolean }[];
    }
  | {
      etc: { name: string; selected: boolean }[];
    };

export type BeverStateType = { name: string; selected: boolean };

const COFFEE = 'coffee' as const;
const NONCOFFEE = 'nonCoffee' as const;
const ETC = 'etc' as const;

export type CateType = 'coffee' | 'nonCoffee' | 'etc';
