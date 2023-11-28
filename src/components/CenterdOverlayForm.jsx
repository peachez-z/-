import { Container } from "react-bootstrap";
import styled from "styled-components";
import OverlayWrapper from "./shared/OverlayWrapper";

export default function CenterdOverlayForm({ children }) {
  return (
    <StyledCentralizeContainer>
      <StyledHeader>Dutch Pay</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCentralizeContainer>
  );
}

const StyledHeader = styled.h1`
  font-weight: 200;
  letter-spacing: 5px;
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
