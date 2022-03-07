import { useEffect, useState } from "react";
import { Check, Clipboard, Share } from "react-feather";
import styled from "styled-components";
import { useFiles } from "./files-provider";
import { UploadButton } from "./upload-button";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 1rem;
  background: inherit;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(0, 0, 0, 0.5);
    backdrop-filter: saturate(180%) blur(1.25rem);
    background: inherit;
    z-index: -1;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  max-width: 60rem;
  margin: auto;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #000;
  background: #b7f499;
  padding: 1rem 1.5rem;
  border-radius: 5rem;
  border: 0px;
  min-width: 10rem;
`;

export const SharePanel = ({ sendId }: { sendId: string }) => {
  const { files } = useFiles();
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
        <UploadButton />
        {!!files.length && (
          <Button onClick={onShare}>
            <Share /> Share
          </Button>
        )}
      </Buttons>
    </Container>
  );
};
