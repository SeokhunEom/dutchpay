import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import groupMembersState from '../state/groupMembers';
import expensesState from '../state/expenses';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;

function AddExpenseForm() {
  const members = useRecoilValue(groupMembersState);
  const setExpense = useSetRecoilState(expensesState);

  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState('');
  const [validated, setValidated] = useState(false);
  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    setDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
  }, []);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const amountValid = amount > 0;
    const payerValid = payer.length > 0;

    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && amountValid && payerValid;
  };

  const handleSubmit:HandleSubmitType = (event) => {
    event.preventDefault();
    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };
      setExpense((expense) => [...expense, newExpense]);
    }
    setValidated(true);
  };

  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control type="text" isValid={isDescValid} isInvalid={!isDescValid && validated} placeholder="비용에 대한 설명을 입력해 주세요" value={desc} onChange={(e) => setDesc(e.target.value)} />
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>비용 내용을 입력해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control type="number" isValid={isAmountValid} isInvalid={!isAmountValid && validated} placeholder="비용은 얼마였나요?" value={(validated || amount !== 0) ? amount : ''} onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)} />
              <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>1원 이상의 금액을 입력해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select isValid={isPayerValid} isInvalid={!isPayerValid && validated} value={payer} onChange={(e) => setPayer(e.target.value)}>
                <option disabled value="">
                  누가 결제 했나요?
                </option>
                <option>영수</option>
                {members.map((member) => <option key={member} value={member}>{member}</option>)}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>결제자를 선택해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col sx={12} className="d-grid gap-2">
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 15px;

    input, select {
        background: #59359A;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0;
        color: #F8F9FA;
        height: 45px;

        &:focus {
            color: #F8F9FA;
            background: #59359A;
            filter: brightness(80%);
        }

        ::placeholder {
            color: #F8F9FA;
        }
    }
`;

export const StyledTitle = styled.h3`
    color: #FFFBF8;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 15px;
`;

const StyledSubmitButton = styled(Button).attrs({ type: 'submit' })`
    width: 100%;
    height: 60px;
    padding: 16px 32px;
    border: 0;
    border-radius: 8px;
    background-color: #E2D9F3;
    color: #59359A;
    margin-top: 10px;
    
    &:hover {
        background-color: #E2D9F3;
        filter: rgba(0, 0, 0, 0.3);
    }
`;

export default AddExpenseForm;
