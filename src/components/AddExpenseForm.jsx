import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMambersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";

export default function AddExpenseForm() {
  const [validated, setValidated] = useState(false);
  const members = useRecoilValue(groupMambersState);

  const setExpense = useSetRecoilState(expensesState);

  const today = new Date();
  const [date, setDate] = useState([
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const payerValid = payer != null;
    const amountValid = amount > 0;

    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && payerValid && amountValid;
  };

  const handleSubmit = (event) => {
    console.log(date, desc, amount, payer);
    event.preventDefault();
    const form = event.currentTarget;
    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };
      setExpense((expense) => [...expense, newExpense]);
    }
    setValidated(true);
  };

  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <h3>1. 비용 추가하기</h3>
        <Form.Group>
          <Form.Control
            type="date"
            placeholder="결제한 날짜를 선택해 주세요"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="비용에 대한 설명을 입력해 주세요"
            value={desc}
            isValid={isDescValid}
            isInvalid={!isDescValid && validated}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Form.Control.Feedback type="invalid" data-value={isDescValid}>
            비용 내용을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="비용은 얼마였나요?"
            value={amount}
            isValid={isAmountValid}
            isInvalid={!isAmountValid && validated}
            onChange={({ target }) => setAmount(target.value)}
          />
          <Form.Control.Feedback type="invalid" data-value={isAmountValid}>
            1원 이상 금액을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Select
            defaultValue=""
            onChange={({ target }) => setPayer(target.value)}
            isValid={isPayerValid}
            isInvalid={!isPayerValid && validated}
          >
            <option disabled value="">
              누가 결제했나요?
            </option>
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid" data-value={isPayerValid}>
            결제자를 선택해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">추가하기</Button>
      </Form>
    </div>
  );
}
