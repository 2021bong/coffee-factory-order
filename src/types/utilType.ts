export type CategoryType = { drinkType: string; drink: { name: string; selected: boolean }[] };

export interface OrderType {
  name: string;
  bever: string;
  type: string;
}
