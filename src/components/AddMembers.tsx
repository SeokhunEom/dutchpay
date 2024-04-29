import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import styled from 'styled-components';
import CenteredOverlayForm from './shared/CenteredOverlayForm';
import groupMembersState from '../state/groupMembers';
import groupNameState from '../state/groupName';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;

function AddMembers() {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [validated, setValidated] = useState(false);
  const title = `${groupName} 그룹에 추가할 멤버들의 이름을 입력해 주세요.`;

  const handleSubmit: HandleSubmitType = (event) => {
    event.preventDefault();

    setValidated(true);
  };

  return (
    <CenteredOverlayForm title={title} validated={validated} handleSubmit={handleSubmit}>
      <InputTags placeholder="이름 간에 띄어 쓰기" data-testId="input-member-names" onTags={(value) => setGroupMembers(value.values)} />
      {validated && groupMembers.length === 0 && <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>}
    </CenteredOverlayForm>
  );
}

const StyledErrorMessage = styled.span`
    color: red;
`;

export default AddMembers;
