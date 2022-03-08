import { useEffect, useState } from "react";
import { Check, Clipboard, Share2 } from "react-feather";
import styled from "styled-components";
import { useFiles } from "./files-provider";
import { UploadButton } from "./upload-button";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 2rem;
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
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 3fr;
  max-width: 20rem;
  margin: auto;
`;

export const Button = styled.button`
  font-family: "DM Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  color: #000;
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 4rem;
  border: 0px;
  font-size: 18px;
`;

export const SharePanel = () => {
  const { sendId, files } = useFiles();
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
        url: shareLink,
      });
  };

  return (
    <Container>
      <Buttons>
        <UploadButton />
        {!!files.length && (
          <Button onClick={onShare}>
            <Share2 /> Share
          </Button>
        )}
      </Buttons>
    </Container>
  );
};
