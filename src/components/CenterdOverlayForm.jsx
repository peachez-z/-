import { Container, Button, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import OverlayWrapper from "./shared/OverlayWrapper";

export default function CenterdOverlayForm({
  title,
  children,
  validated,
  handleSubmit,
}) {
  return (
    <StyledCentralizeContainer>
      <StyledLogo>Dutch Pay</StyledLogo>
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledRow>
              <Row className="align-items-start">
                <StyledH2>{title}</StyledH2>
              </Row>
              <Row className="align-items-center">{children}</Row>
              <Row className="align-items-end">
                <StyledSubmitButton type="submit">저장</StyledSubmitButton>
              </Row>
            </StyledRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizeContainer>
  );
}

const StyledLogo = styled.h1`
  font-weight: 200;
  letter-spacing: 10px;
  color: stateblue;
  text-align: center;
  margin-bottom: 0.8em;
`;

const StyledCentralizeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 10px;
  width: 50vw;
  min-height: 100vh;
`;

const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({ type: "submit" })`
  background-color: #6610f2;
  border-radius: 8px;
  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
