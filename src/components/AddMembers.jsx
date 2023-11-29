import { InputTags } from "react-bootstrap-tagsinput";
import CenterdOverlayForm from "../components/shared/CenterdOverlayForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";
import { useState } from "react";
import styled from "styled-components";

export default function AddMembers() {
  const [groupMambers, setGroupMembers] = useRecoilState(groupMembersState);
  const [validated, setValidated] = useState(false);
  const groupName = useRecoilValue(groupNameState);
  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
  };
  const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`;
  return (
    <CenterdOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <InputTags
        placeholder="이름 간 띄어쓰기"
        onTags={(value) => {
          setGroupMembers(value.values);
        }}
      />
      {validated && groupMambers.length === 0 && (
        <StyledErrorMessage>
          {" "}
          그룹 멤버들의 이름을 입력해 주세요.
        </StyledErrorMessage>
      )}
    </CenterdOverlayForm>
  );
}

const StyledErrorMessage = styled.span`
  color: red;
`;
