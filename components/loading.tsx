import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Potato = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  animation-name: spin;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = () => (
  <Container>
    <Potato>🥔</Potato>
    <div>baking the potato...</div>
  </Container>
);
