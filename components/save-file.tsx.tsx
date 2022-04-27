import { DownloadCloud } from "react-feather";
import styled from "styled-components";
import { FileObject } from "./files-provider";

const SaveButton = styled.button`
  color: #000;
  background-color: #fff;
  border-radius: 0rem 0rem 1rem 1rem;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  margin-top: -0.3rem;
  border: none;
`;

const SaveAnchor = styled.a`
  color: #000;
  background-color: #fff;
  border-radius: 0rem 0rem 1rem 1rem;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  margin-top: -0.3rem;
`;

export const SaveFile = ({ file }: { file: FileObject }) => {
  const { name, type, data } = file;
  const src = URL.createObjectURL(data);
  const _file = new File([data], name);

  const saveFileUsingNavigator = async () => {
    try {
      await navigator?.share({
        files: [_file],
        title: `Tap Save ${type.includes("video") ? "Video" : "Photo"}`,
      });
    } catch {}
  };

  if (navigator?.canShare?.({ files: [_file] })) {
    return (
      <SaveButton onClick={saveFileUsingNavigator}>
        <DownloadCloud />
      </SaveButton>
    );
  }
  return (
    <SaveAnchor href={src} download={name}>
      <DownloadCloud />
    </SaveAnchor>
  );
};
