import { createContext, useState } from "react";

interface FileState {
  file: File | null;
  setFile: ((file: File) => void) | null;
}

export const FileContext = createContext<FileState>({
  file: null,
  setFile: null,
});

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <FileContext.Provider value={{ file: file, setFile: setFile }}>
      {children}
    </FileContext.Provider>
  );
}
