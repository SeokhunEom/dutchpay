import { useRecoilValue } from 'recoil';
import { Table } from 'react-bootstrap';
import expensesState from '../state/expenses';

function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <Table data-testid="expenseList" borderless hover responsive>
      <thead>
        <tr>
          <th>날짜</th>
          <th>내용</th>
          <th>결제자</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(({ date, desc, amount, payer }, index) => (
          <tr key={index}>
            <td>{date}</td>
            <td>{desc}</td>
            <td>{payer}</td>
            <td>{amount} 원</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExpenseTable;
