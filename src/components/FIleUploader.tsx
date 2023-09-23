import { useContext } from "react";
import { FileContext } from "./FileContext";

export function FileUploader() {
  const { setFile } = useContext(FileContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && e.target.files;
    if (files && setFile) {
      setFile(files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
