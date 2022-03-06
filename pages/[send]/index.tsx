import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../../utils/supabase";

type SendProps = {
  sendId: string;
  isNew: boolean;
};

const Send: NextPage<SendProps> = ({ sendId }) => {
  const router = useRouter();
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
  }, [sendId]);

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

  const uploadFiles = async (files: File[]) => {
    const uploads = files.map((file) => {
      return supabase.storage
        .from("sends")
        .upload(`${sendId}/${file.name}`, file);
    });
    await Promise.all(uploads);
  };

  return (
    <div>
      <Head>
        <title>Full send it</title>
        <meta name="description" content="Send photos in full quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DropZone onDrop={uploadFiles} />
        <div style={{ display: "flex", gap: "4rem" }}>
          {files.map((file) => (
            <img
              key={file}
              src={file}
              style={{ maxWidth: "16rem", maxHeight: "16rem" }}
              alt={"image"}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const DropZone = ({ onDrop }: { onDrop: (files: any) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop some files here, or click to select files</p>
      )}
    </div>
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

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}

export default Send;
