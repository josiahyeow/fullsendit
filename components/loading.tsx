import { Zap } from "react-feather";
import styled from "styled-components";

const Container = styled.div`
  margin: auto;
`;

export const Loading = () => (
  <Container>
    <Zap size="4rem" />
  </Container>
);
