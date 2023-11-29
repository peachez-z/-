import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { Table } from "react-bootstrap";

export default function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <Table borderless hover responsive>
      <thead>
        <tr>
          <th>날짜</th>
          <th>내용</th>
          <th>결제자</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(({ date, desc, amount, payer }) => (
          <tr>
            <td>{date}</td>
            <td>{desc}</td>
            <td>{payer}</td>
            <td>{amount}원</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
