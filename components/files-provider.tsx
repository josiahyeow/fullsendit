import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

type FilesValue = {
  sendId: string;
  files: string[];
  upload: (files: any[]) => void;
  reload: () => void;
  isUploading: boolean;
};

const FileContext = createContext<FilesValue>({
  sendId: "",
  files: [],
  upload: () => {},
  reload: () => {},
  isUploading: false,
});

export const FilesProvider = ({
  sendId,
  children,
}: {
  sendId: string;
  children: React.ReactNode;
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    const getFile = async () => {
      if (!sendId) {
        return;
      }
      await listFiles();
    };
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendId, increment]);

  const listFiles = async () => {
    const { data } = await supabase.storage.from("sends").list(sendId);
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

  const reload = () => setIncrement((prev) => prev + 1);

  const uploadFiles = async (files: File[]) => {
    const uploads = files.map((file) => {
      return supabase.storage
        .from("sends")
        .upload(`${sendId}/${file.name}`, file);
    });
    setIsUploading(true);
    await Promise.all(uploads);
    setIsUploading(false);
    reload();
  };

  const value = {
    sendId,
    files,
    upload: uploadFiles,
    isUploading,
    reload: () => setIncrement((prev) => prev + 1),
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFiles = () => useContext(FileContext);

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
