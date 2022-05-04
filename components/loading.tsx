import styled from "styled-components";
import Script from "next/script";
import { useTheme } from "./theme-provider";

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

export const Loading = () => {
  const { theme } = useTheme();
  return (
    <>
      <Script src="https://cdn.lordicon.com/lusqsztk.js" />
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: `<lord-icon
              src="https://cdn.lordicon.com/giaigwkd.json"
              trigger="loop"
              colors="primary:${theme.primary}"
              style="width:4rem;height:4rem;">
          </lord-icon>`,
          }}
        />
      </Container>
    </>
  );
};
