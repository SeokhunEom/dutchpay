import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import expensesState, { IExpense } from '../state/expenses';
import groupMembersState from '../state/groupMembers';
import { StyledTitle } from './AddExpenseForm';

interface ITransaction {
  receiver: string;
  sender: string;
  amount: number;
}

interface IMembersToPay {
  [key: string]: number;
}

function SettlementSummary() {
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);

  const totalExpenseAmount = expenses.reduce((prevAmount, curExpense) => prevAmount + curExpense.amount, 0);
  const groupMembersCount = members.length;
  const splitAmount = totalExpenseAmount / groupMembersCount;

  const minimumTransaction: ITransaction[] = calculateMinimumTransaction(expenses, members, splitAmount);

  return (
    <StyledWrapper>
      <StyledTitle>2. 정산은 이렇게!</StyledTitle>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <StyledSummary>
            <span>
              {groupMembersCount}
              {' '}
              명이서 총
              {' '}
              {totalExpenseAmount}
              {' '}
              원 지출
            </span>
            <span>
              한 사람 당
              {' '}
              {splitAmount}
              {' '}
              원
            </span>
          </StyledSummary>
          <StyledUl>
            {minimumTransaction.map((transaction, index) => (
              <li key={index}>
                <span>
                  {transaction.sender}
                  가
                  {' '}
                  {transaction.receiver}
                  에게
                  {' '}
                  {transaction.amount}
                  {' '}
                  원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
        </>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    color: #FFFBFB;
    box-shadow: 3px 0 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    text-align: center;
    font-size: 22px;
`;

const StyledSummary = styled.div`
    margin-top: 31px;
`;

const StyledUl = styled.ul`
    margin-top: 31px;
    font-weight: 600;
    line-height: 200%;
    
    list-style-type: disclosure-closed;
    li::marker {
        animation: blinker 1.5s linear infinite;
    }
    
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`;

function calculateMinimumTransaction(expenses: IExpense[], members: string[], amountPerPerson: number): ITransaction[] {
  const minTransactions: ITransaction[] = [];

  if (amountPerPerson === 0) return minTransactions;

  const membersToPay:IMembersToPay = {};
  members.forEach((member) => membersToPay[member] = amountPerPerson);
  expenses.forEach(({ payer, amount }) => membersToPay[payer] -= amount);

  const sortedMembersToPay = Object.keys(membersToPay).map((member) => (
    { member, amount: membersToPay[member] }
  )).sort((a, b) => a.amount - b.amount);

  let left = 0;
  let right = sortedMembersToPay.length - 1;
  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) left += 1;
    while (left < right && sortedMembersToPay[right].amount === 0) right -= 1;

    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left += 1;
    } else {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toReceive.amount += amountToSend;
      toSend.amount = 0;
      right -= 1;
    }
  }

  return minTransactions;
}

export default SettlementSummary;
