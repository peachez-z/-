import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
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
  const members = ["가을", "봄", "겨울"];

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
    <div>
      <h3>2. 정산 결과</h3>
      {totalExpenseAmount > 0 && groupMemberCount > 0 && (
        <div>
          <span>
            {groupMemberCount} 명이서 총 {totalExpenseAmount} 원 지출
          </span>
          <span>한 사람 당 {splitAmount}원</span>
          <ul>
            {minimumRTransactions.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender} -> {receiver}에게 {amount} 원 보내기
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
