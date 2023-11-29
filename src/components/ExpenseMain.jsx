import { Col, Container, Row } from "react-bootstrap";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { groupNameState } from "../state/groupName";
import SettlementSummary from "./SettlementSummary";
import ServieceLogo from "./shared/ServieceLogo";

export default function ExpenseMain() {
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

const LeftPane = () => (
  <Container>
    <Row>
      <ServieceLogo />
    </Row>
    <Row>
      <AddExpenseForm />
    </Row>
    <Row>
      <SettlementSummary />
    </Row>
  </Container>
);

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || "그룹이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledContainer>
  );
};

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
