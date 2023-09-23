import { useContext } from "react";
import { FileContext } from "./FileContext";
import { useNavigate } from "react-router";

export function FileUploader() {
  const { setFile } = useContext(FileContext);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && e.target.files;
    if (files && setFile) {
      setFile(files[0]);
      console.log("yes");
      navigate("/tracker");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
