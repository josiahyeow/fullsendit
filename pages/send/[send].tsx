import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { ImageGallery } from "../../components/image-gallery";
import { SharePanel } from "../../components/share-panel";
import { supabase } from "../../utils/supabase";

type SendProps = {
  sendId: string;
};

const Main = styled.main`
  padding: 2rem;
  margin: auto;
  max-width: 60rem;
  display: grid;
  gap: 4rem;
`;

const Send: NextPage<SendProps> = ({ sendId }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState("");
  const uploadFiles = async (files: File[]) => {
    const uploads = files.map((file) => {
      return supabase.storage
        .from("sends")
        .upload(`${sendId}/${file.name}`, file);
    });
    setIsUploading(true);
    const result = await Promise.all(uploads);
    setIsUploading(false);
    setUploaded(JSON.stringify(result));
  };

  return (
    <div>
      <Head>
        <title>Full send it</title>
        <meta name="description" content="Send photos in full quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <SharePanel sendId={sendId} />
        {isUploading ? (
          <DropZoneContainer>
            <UploadingSpan>Uploading</UploadingSpan>
          </DropZoneContainer>
        ) : (
          <DropZone onDrop={uploadFiles} />
        )}

        <ImageGallery sendId={sendId} reload={uploaded} />
      </Main>
    </div>
  );
};

const UploadingSpan = styled.button`
  padding: 1rem 2rem;
  border-radius: 5rem;
  border: 0px;
  color: #fff;
  background-color: #000;
`;

const DropZoneContainer = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  border: 2px dashed #eaeaea;
  display: flex;
  justify-content: center;
`;

const DropFiles = styled.span`
  font-weight: bold;
  padding: 3rem;
`;

const UploadButton = styled.button`
  color: #000000;
  background-color: #b7f499;
  padding: 1rem 2rem;
  border-radius: 5rem;
  border: 0px;
`;

const DropZone = ({ onDrop }: { onDrop: (files: any) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropZoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <DropFiles>Drop the files here</DropFiles>
      ) : (
        <UploadButton>Select files</UploadButton>
      )}
    </DropZoneContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { send: sendId } = context.params || {};
  return {
    props: {
      sendId,
    },
  };
};

export default Send;
