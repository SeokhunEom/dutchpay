import { atom } from 'recoil';

export interface IExpense {
  date: string;
  desc: string;
  amount: number;
  payer: string;
}

const expensesState = atom<IExpense[]>({
  key: 'expenses',
  default: [],
});

export default expensesState;
