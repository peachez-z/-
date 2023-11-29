import styled from "styled-components";

export default function OverlayWrapper({ children, padding, minheight }) {
  return (
    <StyledContainer padding={padding} minheight={minheight}>
      {children}
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  padding: ${(props) => props.padding || "5vw"};
  background-color: white;
  filter: drop-shadow(8px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
  min-height: ${(props) => props.minheight || "0"};
`;
