import { detect } from "detect-browser";
import styled from "styled-components";
import ReactPlayer from "react-player/lazy";
import { useFiles } from "./files-provider";

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

const Video = styled.video`
  max-width: 16rem;
  max-height: 16rem;
  border-radius: 1rem;
`;

const NoPhotos = styled.span`
  font-family: "DM Sans", sans-serif;
`;

export const ImageGallery = () => {
  const { files } = useFiles();
  const browser = detect();

  console.log(browser);
  return (
    <Container>
      {!files.length && <NoPhotos>No photos here</NoPhotos>}
      {files.map(({ name, type, data }) => {
        const src = URL.createObjectURL(data);
        if (type.includes("video")) {
          return (
            <div key={name}>
              <ReactPlayer url={src} controls muted />
              <a href={src} download>
                download
              </a>
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
