import React from 'react';
import styled from 'styled-components';

type StyledContainerProps = {
  minHeight?: string;
  padding?: string;
};

type OverlayWrapperProps = StyledContainerProps & {
  children: React.ReactNode;
};

function OverlayWrapper({ children }: OverlayWrapperProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div<StyledContainerProps>`
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 10px;
    background-color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    min-height: ${(props) => props.minHeight || '0'};
`;

export default OverlayWrapper;
