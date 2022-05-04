import styled from "styled-components";
import ReactPlayer from "react-player/lazy";
import { useFiles } from "./files-provider";
import { SaveFile } from "./save-file.tsx";
import { X } from "react-feather";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const File = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-width: 16rem;
  max-height: 16rem;
  border-radius: 1rem;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  video {
    border-radius: 1rem 1rem 0rem 0rem;
  }
`;

const DeleteButton = styled.button`
  top: -0.75rem;
  left: -0.75rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.25rem;
  border-radius: 2rem;
  color: var(--white);
  background-color: var(--red);
  :hover {
    cursor: pointer;
  }
`;

const NoPhotos = styled.span`
  font-family: "DM Sans", sans-serif;
`;

export const ImageGallery = ({
  showControls = false,
}: {
  showControls?: boolean;
}) => {
  const { files, deleteFile } = useFiles();

  return (
    <Container>
      {!files.length && <NoPhotos>No photos here</NoPhotos>}
      {files.map((file) => {
        const { name, type, data } = file;
        const src = URL.createObjectURL(data);
        if (type.includes("video")) {
          return (
            <File key={name}>
              {showControls && (
                <DeleteButton onClick={() => deleteFile(name)}>
                  <X />
                </DeleteButton>
              )}
              <Video>
                <ReactPlayer
                  className="video-player"
                  url={src}
                  controls
                  muted
                  width="auto"
                />
                <SaveFile file={file} />
              </Video>
            </File>
          );
        }
        if (type.includes("image")) {
          return (
            <File key={name}>
              {showControls && (
                <DeleteButton onClick={() => deleteFile(name)}>
                  <X />
                </DeleteButton>
              )}
              <Image src={src} alt={name} />
            </File>
          );
        }
        return null;
      })}
    </Container>
  );
};
