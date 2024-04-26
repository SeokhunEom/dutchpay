import React, { useState } from 'react';
import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import CenteredOverlayForm from './CenteredOverlayForm';
import groupNameState from '../state/groupName';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;
type OnChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

function CreateGroup() {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const handleSubmit:HandleSubmitType = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidGroupName(false);
    } else {
      setValidGroupName(true);
    }
    setValidated(true);
  };

  const onChange: OnChangeType = (event) => {
    setGroupName(event.target.value);
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <CenteredOverlayForm>
      <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-items-start">
              <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="align-items-center">
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder="그룹 이름을 입력해 주세요"
                  onChange={onChange}
                  value={groupName}
                />
                <Form.Control.Feedback type="invalid" data-valid={validGroupName}>그룹 이름을 입력해 주세요.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="align-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
}

const StyledRow = styled(Row)`
    height: 60vh;
    align-items: center;
    justify-content: center;
`;

const StyledH2 = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: 'submit',
})`
    background-color: #6610F2;
    border-radius: 8px;
    border: none;
    
    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`;

export default CreateGroup;
