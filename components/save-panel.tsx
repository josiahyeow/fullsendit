import { Share2 } from "react-feather";
import styled from "styled-components";
import { BigButton } from "./big-button";
import { useFiles } from "./files-provider";

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
    box-shadow: inset 0 0 2000px rgba(0, 0, 0, 0.5);
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

export const SavePanel = () => {
  const { files } = useFiles();

  const _files = files.map((file) => {
    return new File([file.data], file.name);
  });

  const saveFiles = async () => {
    const _files = files.map((file) => {
      return new File([file.data], file.name);
    });
    if (navigator?.canShare?.({ files: _files })) {
      try {
        await navigator?.share({
          files: _files,
          title: `Save ${_files.length} files`,
        });
      } catch {}
    }
  };

  const SaveButton = () => {
    if (navigator.canShare?.({ files: _files })) {
      return (
        <BigButton onClick={saveFiles}>
          <Share2 /> Save all
        </BigButton>
      );
    }
    return null;
  };

  return (
    <Container>
      <Buttons>{!!files.length && <SaveButton />}</Buttons>
    </Container>
  );
};
