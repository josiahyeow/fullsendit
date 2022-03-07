import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../utils/supabase";

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

export const ImageGallery = ({
  sendId,
  reload,
}: {
  sendId: string;
  reload?: string;
}) => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const getFile = async () => {
      if (!sendId) {
        return;
      }
      await listFiles();
    };
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendId, reload]);

  const listFiles = async () => {
    const { data, error } = await supabase.storage.from("sends").list(sendId);
    if (!data?.length) {
      return;
    }
    const fileNames = data.map((file) => file.name);
    const fileDownloads = fileNames.map((fileName) =>
      supabase.storage.from("sends").download(`${sendId}/${fileName}`)
    );
    const blobs = await Promise.all(fileDownloads);
    const fileUrls = blobs
      .map((blob) => blob.data && URL.createObjectURL(blob.data))
      .filter(notEmpty);
    console.log(fileUrls);
    setFiles(fileUrls);
  };

  return (
    <Container>
      {files.map((file) => (
        <div key={file}>
          <Image src={file} alt={"image"} />
        </div>
      ))}
    </Container>
  );
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
