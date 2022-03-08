import { useDropzone } from "react-dropzone";
import { Image, Loader } from "react-feather";
import { useFiles } from "./files-provider";
import { Button } from "./share-panel";

export const UploadButton = () => {
  const { upload, isUploading } = useFiles();
  const { getRootProps, getInputProps } = useDropzone({ onDrop: upload });

  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      {isUploading ? (
        <Loader />
      ) : (
        <>
          <Image />
        </>
      )}
    </Button>
  );
};
