import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import CenteredOverlayForm from './shared/CenteredOverlayForm.tsx';
import groupMembersState from '../state/GroupMembers';
import groupNameState from '../state/groupName';
import { StyledH2, StyledRow, StyledSubmitButton } from './CreateGroup.tsx';

type HandleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;

function AddMembers() {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit: HandleSubmitType = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <StyledRow>
            <Row>
              <StyledH2>
                {groupName}
                에 속한 사람들의 이름을 모두 적어 주세요.
              </StyledH2>
            </Row>
            <Row className="aligin-items-center">
              <InputTags placeholder="이름 간에 띄어 쓰기" onTags={(value) => setGroupMembers(value.values)} />
            </Row>
            {formSubmitted && groupMembers.length === 0 && <span>그룹 멤버들의 이름을 입력해 주세요.</span>}
            <Row className="aligin-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
}

export default AddMembers;
