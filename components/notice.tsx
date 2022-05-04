import React from "react";
import styled from "styled-components";

const NoticeContainer = styled.div`
  margin: auto;
  color: var(--primary);
  background: var(--active-background);
  padding: 2rem;
  border-radius: 1rem;
`;

export const Notice = ({ children }: { children: React.ReactNode }) => {
  return <NoticeContainer>{children}</NoticeContainer>;
};
