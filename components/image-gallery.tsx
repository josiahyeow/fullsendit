import { detect } from "detect-browser";
import styled from "styled-components";
import ReactPlayer from "react-player/lazy";
import { FileObject, useFiles } from "./files-provider";
import { DownloadCloud } from "react-feather";

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

const SaveVideo = styled.a`
  color: #000;
  background-color: #fff;
  border-radius: 0rem 0rem 1rem 1rem;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  margin-top: -0.3rem;
`;

const NoPhotos = styled.span`
  font-family: "DM Sans", sans-serif;
`;

export const ImageGallery = () => {
  const { files } = useFiles();
  const browser = detect();

  const shareFile = async (file: FileObject) => {
    const _file = new File([file.data], file.name);
    if (navigator?.canShare?.({ files: [_file] })) {
      try {
        await navigator?.share({
          files: [_file],
          title: file.name,
        });
      } catch {}
    }
  };

  const shareFiles = async () => {
    const _files = files.map((file) => {
      return new File([file.data], file.name);
    });
    if (navigator?.canShare?.({ files: _files })) {
      try {
        await navigator?.share({
          files: _files,
          title: "Baked potatoes",
        });
      } catch {}
    }
  };

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
                <button
                  onClick={() => shareFile(file)}
                  style={{ padding: "1rem" }}
                >
                  share
                </button>
                <SaveVideo href={src} download={name}>
                  <DownloadCloud />
                </SaveVideo>
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
      <button onClick={() => shareFiles()} style={{ padding: "1rem" }}>
        Save all
      </button>
    </Container>
  );
};
