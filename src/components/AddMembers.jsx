import { InputTags } from "react-bootstrap-tagsinput";
import CenterdOverlayForm from "../components/CenterdOverlayForm";
import { Container, Form, Row, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupMambersState } from "../state/groupMembers";
import { useState } from "react";

export default function AddMembers() {
  const [groupMambers, setGroupMembers] = useRecoilState(groupMambersState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };
  return (
    <CenterdOverlayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <h2>그룹에 속한 사람들의 이름을 모두 적어 주세요.</h2>
          </Row>
          <Row>
            <InputTags
              placeholder="이름 간 띄어쓰기"
              onTags={(value) => {
                setGroupMembers(value.values);
              }}
            />
            {formSubmitted && groupMambers.length === 0 && (
              <span> 그룹 멤버들의 이름을 입력해 주세요.</span>
            )}
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
    </CenterdOverlayForm>
  );
}
