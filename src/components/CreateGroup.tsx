import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import CenteredOverlayForm from './shared/CenteredOverlayForm';
import groupNameState from '../state/groupName';
import ROUTES from '../routes';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;
type OnChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

function CreateGroup() {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);
  const navigate = useNavigate();
  const title = '먼저, 더치 페이 할 그룹의 이름을 정해볼까요?';

  const handleSubmit:HandleSubmitType = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidGroupName(false);
    } else {
      setValidGroupName(true);
      navigate(ROUTES.ADD_MEMBERS);
    }
    setValidated(true);
  };

  const onChange: OnChangeType = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <CenteredOverlayForm title={title} validated={validated} handleSubmit={handleSubmit}>
      <Form.Group controlId="validationGroupName">
        <Form.Control
          type="text"
          required
          placeholder="그룹 이름을 입력해 주세요"
          onChange={onChange}
        />
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>그룹 이름을 입력해 주세요.</Form.Control.Feedback>
      </Form.Group>
    </CenteredOverlayForm>
  );
}

export default CreateGroup;
