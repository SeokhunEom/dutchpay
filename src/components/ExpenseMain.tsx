import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from './ExpenseTable';
import groupNameState from '../state/groupName';
import SettlementSummary from './SettlementSummary';
import ServiceLogo from './shared/ServiceLogo';

function ExpenseMain() {
  return (
    <StyledContainer fluid>
      <Row>
        <Col xs={12} md={5}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </StyledContainer>
  );
}

function LeftPane() {
  return (
    <Container>
      <StyledGapRow>
        <Row>
          <ServiceLogo />
        </Row>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummary />
        </Row>
      </StyledGapRow>
    </Container>
  );
}

function RightPane() {
  const groupName = useRecoilValue(groupNameState);

  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRightPaneWrapper>
  );
}

const StyledContainer = styled(Container)`
  padding-bottom: 30px;
`;

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 31px 100px 31px;
`;

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 100px;
  justify-content: center;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;

export default ExpenseMain;
