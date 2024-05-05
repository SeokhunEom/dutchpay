import React from 'react';
import styled from 'styled-components';
import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import OverlayWrapper from './OverlayWrapper';
import ServiceLogo from './ServiceLogo';

type CenteredOverlayFormProps = {
  title: string;
  children: React.ReactNode;
  validated: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function CenteredOverlayForm({
  title, children, validated, handleSubmit,
}: CenteredOverlayFormProps) {
  return (
    <StyledCentralizedContainer>
      <ServiceLogo />
      <OverlayWrapper>
        <Form validated={validated} onSubmit={handleSubmit}>
          <StyledCentralizedContent>
            <Row className="align-items-start">
              <StyledTitle>{title}</StyledTitle>
            </Row>
            <Row className="align-items-center">
              {children}
            </Row>
            <Row className="align-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledCentralizedContent>
        </Form>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
}

const StyledCentralizedContainer = styled(Container)`
    width: 50vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`;

const StyledCentralizedContent = styled(Row)`
    height: 60vh;
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled.h2`
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

export default CenteredOverlayForm;
