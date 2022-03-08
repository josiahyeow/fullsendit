import styled from "styled-components";
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

  return (
    <Container>
      {!files.length && <NoPhotos>No photos here</NoPhotos>}
      {files.map(({ file, type }) => {
        if (type.includes("video")) {
          return (
            <div key={file.name}>
              <Video
                src={URL.createObjectURL(file)}
                playsInline
                autoPlay
                loop
                muted
                controls
              />
            </div>
          );
        }

        if (type.includes("image")) {
          return (
            <div key={file.name}>
              <Image src={URL.createObjectURL(file)} alt={file.name} />
            </div>
          );
        }
        return null;
      })}
    </Container>
  );
};
