import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useFiles } from "./files-provider";

const DropZoneContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px dashed #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DropText = styled.span`
  font-weight: bold;
  padding: 1rem 2rem;
`;

export const UploadDropZone = () => {
  const { upload, isUploading } = useFiles();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: upload,
  });

  return (
    <DropZoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <DropText>
        {isDragActive
          ? "Drop photos here"
          : isUploading
          ? "Uploading..."
          : "Select photos"}
        {isUploading && <LoadingBar />}
      </DropText>
    </DropZoneContainer>
  );
};

const Bar = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  background-color: #fff;
  opacity: 0.1;
  width: 0px;
  height: 100%;
  animation-name: progres;
  animation-duration: 20s;
  animation-fill-mode: forwards;
  overflow: hidden;
  border-radius: 0.85rem;

  @keyframes progres {
    0% {
      width: 0%;
    }
    25% {
      width: 50%;
    }
    50% {
      width: 75%;
    }
    75% {
      width: 85%;
    }
    100% {
      width: 95%;
    }
  } ;
`;

const LoadingBar = () => <Bar />;
