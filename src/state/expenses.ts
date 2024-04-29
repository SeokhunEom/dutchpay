import { atom } from 'recoil';

interface IExpense {
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
