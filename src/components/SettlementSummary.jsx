import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import styled from "styled-components";
import { StyledTitle } from "../components/AddExpenseForm";
import { groupMembersState } from "../state/groupMembers";

export const calculateMinimumTransaction = (
  expenses,
  members,
  amountPerPerson
) => {
  const minTransactions = [];
  if (!expenses || !members || !amountPerPerson || amountPerPerson === 0) {
    return minTransactions;
  }

  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });

  expenses.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({ member: member, amount: membersToPay[member] }))
    .sort((a, b) => a.amount - b.amount);

  var left = 0;
  var right = sortedMembersToPay.length - 1;
  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }

    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }

  return minTransactions;
};

export default function SettlementSummary() {
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);

  const totalExpenseAmount = parseFloat(
    expenses.reduce(
      (prevAmount, curExpense) => prevAmount + parseFloat(curExpense.amount),
      0
    )
  ).toFixed(2);
  const groupMemberCount = members.length;
  const splitAmount = totalExpenseAmount / groupMemberCount;

  //   핵심 로직 구현
  const minimumRTransactions = calculateMinimumTransaction(
    expenses,
    members,
    splitAmount
  );
  return (
    <StyledWrapper>
      <StyledTitle>2. 정산 결과</StyledTitle>
      {totalExpenseAmount > 0 && groupMemberCount > 0 && (
        <div>
          <StyledSummary>
            <span>
              {groupMemberCount} 명이서 총 {totalExpenseAmount} 원 지출
            </span>
            <span>한 사람 당 {splitAmount}원</span>
          </StyledSummary>
          <StyledUl>
            {minimumRTransactions.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender} -> {receiver}에게 {amount} 원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683ba1;
  color: #fffbfb;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  font-size: 22px;
`;

const StyledUl = styled.ul`
  margin-top: 31px;
  font-weight: 600;
  line-height: 200%;
  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const StyledSummary = styled.div`
  margin-top: 31px;
`;
