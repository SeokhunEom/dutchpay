import styled from 'styled-components';

function ServiceLogo() {
  return <StyledLogo>Dutch Pay</StyledLogo>;
}

const StyledLogo = styled.h1`
  font-weight: 200;
  letter-spacing: 10px;
  color: slateblue;
  text-align: center;
  margin-bottom: 0.8em;
`;

export default ServiceLogo;
