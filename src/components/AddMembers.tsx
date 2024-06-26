import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CenteredOverlayForm from './shared/CenteredOverlayForm';
import groupMembersState from '../state/groupMembers';
import groupNameState from '../state/groupName';
import ROUTES from '../routes';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;

function AddMembers() {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [groupMembersString, setGroupMembersString] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const title = `${groupName} 그룹에 추가할 멤버들의 이름을 입력해 주세요.`;
  const isSamsungInternet = window.navigator.userAgent.includes('SAMSUNG');

  const handleSubmit: HandleSubmitType = (event) => {
    event.preventDefault();

    setValidated(true);
    if (groupMembers.length > 0) navigate(ROUTES.EXPENSE_MAIN);
    else if (groupMembersString.length > 0) setGroupMembers(groupMembersString.split(','));
  };

  return (
    <CenteredOverlayForm title={title} validated={validated} handleSubmit={handleSubmit}>
      {isSamsungInternet
        ? <Form.Control placeholder="이름 간 컴마(,)로 구분" onChange={(event) => setGroupMembersString(event.target.value)} />
        : <InputTags placeholder="이름 간에 띄어 쓰기" data-testid="input-member-names" onTags={(value) => setGroupMembers(value.values)} />}
      {validated && groupMembers.length === 0 && <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>}
    </CenteredOverlayForm>
  );
}

const StyledErrorMessage = styled.span`
    color: red;
`;

export default AddMembers;
