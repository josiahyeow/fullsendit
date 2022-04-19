import React from "react";
import styled from "styled-components";

const NoticeContainer = styled.div`
  margin: auto;
  background-color: #f5f5f5;
  color: #000;
  padding: 2rem;
  border-radius: 1rem;
`;

export const Notice = ({ children }: { children: React.ReactNode }) => {
  return <NoticeContainer>{children}</NoticeContainer>;
};
