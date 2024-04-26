import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import OverlayWrapper from './shared/OverlayWrapper.tsx';

type CenteredOverlayFormProps = {
  children: React.ReactNode;
};

function CenteredOverlayForm({ children }: CenteredOverlayFormProps) {
  return (
    <StyledCentralizedContainer>
      <StyledHeader>Dutch Pay</StyledHeader>
      <OverlayWrapper>
        {children}
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

const StyledHeader = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
    color: slateblue;
    text-align: center;
    margin-bottom: 0.8em;
`;

export default CenteredOverlayForm;
