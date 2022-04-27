import styled from "styled-components";
import ReactPlayer from "react-player/lazy";
import { useFiles } from "./files-provider";
import { SaveFile } from "./save-file.tsx";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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

const NoPhotos = styled.span`
  font-family: "DM Sans", sans-serif;
`;

export const ImageGallery = () => {
  const { files } = useFiles();

  return (
    <Container>
      {!files.length && <NoPhotos>No photos here</NoPhotos>}
      {files.map((file) => {
        const { name, type, data } = file;
        const src = URL.createObjectURL(data);
        if (type.includes("video")) {
          return (
            <div key={name}>
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
            </div>
          );
        }
        if (type.includes("image")) {
          return (
            <div key={name}>
              <Image src={src} alt={name} />
            </div>
          );
        }
        return null;
      })}
    </Container>
  );
};
