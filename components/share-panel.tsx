import { useEffect, useState } from "react";
import { Check, Clipboard, Share2 } from "react-feather";
import styled from "styled-components";
import { BigButton } from "./big-button";
import { DeleteButton } from "./delete-button";
import { useFiles } from "./files-provider";
import { UploadButton } from "./upload-button";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 1.5rem;
  background: inherit;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px var(--background);
    backdrop-filter: saturate(180%) blur(1.25rem);
    background: inherit;
    z-index: -1;
  }
`;

const Buttons = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 3fr;
  max-width: 20rem;
  margin: auto;
`;

export const CircleButton = styled(BigButton)`
  padding: 1rem;
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

  const ShareButton = () => {
    if (navigator.canShare?.({ url: shareLink })) {
      return (
        <BigButton onClick={onShare}>
          <Share2 /> Share
        </BigButton>
      );
    }
    return <BigButton onClick={onCopy}>{copyIcon} Copy link</BigButton>;
  };

  return (
    <Container>
      <Buttons>
        <DeleteButton />
        <UploadButton />
        {!!files.length && <ShareButton />}
      </Buttons>
    </Container>
  );
};
