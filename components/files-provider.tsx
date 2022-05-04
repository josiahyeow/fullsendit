import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export type FileObject = {
  name: string;
  type: string;
  data: Blob;
};

type FilesValue = {
  sendId: string;
  files: FileObject[];
  upload: (files: any[]) => void;
  reload: () => void;
  dispose: () => void;
  deleteFile: (fileName: string) => void;
  loading: boolean;
  isUploading: boolean;
};

const FileContext = createContext<FilesValue>({
  sendId: "",
  files: [],
  upload: () => {},
  reload: () => {},
  dispose: () => {},
  deleteFile: () => {},
  loading: false,
  isUploading: false,
});

export const FilesProvider = ({
  sendId,
  children,
}: {
  sendId: string;
  children: React.ReactNode;
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    const getFile = async () => {
      setLoading(true);
      if (!sendId) {
        setLoading(false);
        return;
      }
      await listFiles();
      setLoading(false);
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
    const _files = blobs
      .map((blob, i) => {
        if (!blob.data) {
          return;
        }
        return {
          name: fileNames[i],
          type: blob.data.type,
          data: blob.data,
        };
      })
      .filter(notEmpty);
    setFiles(_files);
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

  const dispose = async () => {
    const { data } = await supabase.storage.from("sends").list(sendId);
    if (!data?.length) {
      return;
    }
    const fileNames = data.map((file) => `${sendId}/${file.name}`);
    await supabase.storage.from("sends").remove(fileNames);
    setFiles([]);
    reload();
  };

  const deleteFile = async (fileName: string) => {
    await supabase.storage.from("sends").remove([`${sendId}/${fileName}`]);
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    reload();
  };

  const value = {
    sendId,
    files,
    loading,
    upload: uploadFiles,
    dispose,
    deleteFile,
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
