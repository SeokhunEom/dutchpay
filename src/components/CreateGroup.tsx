import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import groupNameState from '../state/groupName';
import CenteredOverlayForm from './CenteredOverlayForm';

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

  return (
    <div>
      <h1>Dutch Pay</h1>
      <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row>
            <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
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
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
      <CenteredOverlayForm />
    </div>
  );
}

export default CreateGroup;
