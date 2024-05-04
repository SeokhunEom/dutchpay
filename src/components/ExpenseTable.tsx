import { useRecoilValue } from 'recoil';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import expensesState from '../state/expenses';
import OverlayWrapper from './shared/OverlayWrapper';

function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minheight="73vh">
      <Table data-testid="expenseList" borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
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
    </OverlayWrapper>
  );
}

const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  th {
    padding: 20px;
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 24px;
    line-height: 59px;
  }
`;

export default ExpenseTable;
