import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useFiles } from "./files-provider";

const DropZoneContainer = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  border: 2px dashed #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropFiles = styled.span`
  font-weight: bold;
  padding: 3rem;
`;

const UploadText = styled.span`
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
      {isDragActive ? (
        <DropFiles>Drop photos here</DropFiles>
      ) : (
        <UploadText>{isUploading ? "Uploading" : "Select photos"}</UploadText>
      )}
    </DropZoneContainer>
  );
};
