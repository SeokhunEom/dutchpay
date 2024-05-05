import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from './ExpenseTable';
import groupNameState from '../state/groupName';
import ServiceLogo from './shared/ServiceLogo';

function ExpenseMain() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
}

function LeftPane() {
  return (
    <StyledContainer>
      <Row>
        <ServiceLogo />
      </Row>
      <Row>
        <AddExpenseForm />
      </Row>
    </StyledContainer>
  );
}

function RightPane() {
  const groupName = useRecoilValue(groupNameState);

  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  padding: 100px 31px 100px 31px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;

export default ExpenseMain;
