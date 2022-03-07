import { useEffect, useState } from "react";
import { Check, Clipboard, Share } from "react-feather";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 1rem;
  background-color: #000;
`;

const Buttons = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto;
  max-width: 60rem;
  margin: auto;
`;

const Button = styled.button`
  color: #000;
  background: #b7f499;
  padding: 1rem 2rem;
  border-radius: 5rem;
  border: 0px;
`;

export const SharePanel = ({ sendId }: { sendId: string }) => {
  const [shareLink, setShareLink] = useState("");
  const [copyIcon, setCopyIcon] = useState(<Clipboard />);

  useEffect(() => {
    setShareLink(`${window?.location?.origin}/${sendId}`);
  }, [sendId]);

  const onCopy = async () => {
    navigator.clipboard.writeText(shareLink);
    setCopyIcon(<Check />);
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
    setCopyIcon(<Clipboard />);
  };

  const onShare = () => {
    shareLink &&
      navigator.share?.({
        title: "Your fully sent photos",
        text: "View and download full quality photos shared with you.",
        url: shareLink,
      });
  };

  return (
    <Container>
      <Buttons>
        <Button onClick={onCopy}>{copyIcon}</Button>
        <Button onClick={onShare}>
          <Share />
        </Button>
      </Buttons>
    </Container>
  );
};
