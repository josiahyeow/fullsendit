import JSZip from "jszip";
import { useState } from "react";
import { DownloadCloud } from "react-feather";
import styled from "styled-components";
import { BigButton } from "./big-button";
import { FileObject, useFiles } from "./files-provider";
import FileSaver from "file-saver";
import { detect } from "detect-browser";

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
    box-shadow: inset 0 0 2000px var(--background);
    backdrop-filter: saturate(180%) blur(1.25rem);
    background: inherit;
    z-index: -1;
  }
`;

const Buttons = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  max-width: 12rem;
  margin: auto;
`;

export const CircleButton = styled(BigButton)`
  padding: 1rem;
`;

export const SavePanel = () => {
  const { files } = useFiles();
  const [zipping, setZipping] = useState(false);
  const os = detect();
  const isIOS = os?.os === "iOS";

  const _files = files.map((file) => {
    return new File([file.data], file.name);
  });

  const zipFiles = async () => {
    setZipping(true);
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file.data);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    FileSaver.saveAs(URL.createObjectURL(blob), "Baked Potatoes.zip");
    setZipping(false);
  };

  const saveFilesUsingNavigator = async () => {
    const _files = files.map((file) => {
      return new File([file.data], file.name, { type: file.type });
    });
    if (navigator?.canShare?.({ files: _files })) {
      try {
        await navigator?.share({
          files: _files,
          title: `Tap Save ${_files.length} ${DetermineFileTypes(files)}`,
        });
      } catch (err: any) {
        console.error(err);
      }
    }
  };

  const SaveButton = () => {
    if (isIOS && navigator?.canShare?.({ files: _files })) {
      return (
        <BigButton onClick={saveFilesUsingNavigator}>
          <DownloadCloud /> Save all
        </BigButton>
      );
    }
    return (
      <BigButton onClick={zipFiles} disabled={zipping}>
        <DownloadCloud /> {zipping ? "Saving" : "Save all"}
      </BigButton>
    );
  };

  return (
    <Container>
      <Buttons>{!!files.length && <SaveButton />}</Buttons>
    </Container>
  );
};

const DetermineFileTypes = (files: FileObject[]) => {
  const hasImages = Object.values(files).some(({ type }) =>
    type.includes("image")
  );
  const hasVideos = Object.values(files).some(({ type }) =>
    type.includes("video")
  );

  if (hasImages && !hasVideos) {
    return "Images";
  }
  if (!hasImages && hasVideos) {
    return "Videos";
  }
  return "Items";
};
