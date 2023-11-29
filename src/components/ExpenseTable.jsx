import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { Table } from "react-bootstrap";
import OverlayWrapper from "./shared/OverlayWrapper";
import styled from "styled-components";

export default function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minheight={"73vh"}>
      <Table borderless hover responsive>
        <Styledthead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </Styledthead>
        <Styledtbody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{amount}원</td>
            </tr>
          ))}
        </Styledtbody>
      </Table>
    </OverlayWrapper>
  );
}

const Styledthead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  th {
    padding: 20px 8px;
  }
`;

const Styledtbody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 24px;
    line-height: 59px;
    text-align: center;
  }
`;
