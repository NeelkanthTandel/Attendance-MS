import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

function Drag() {
  const [files, setFiles] = useState(null);
  const handleChange = (file) => {
    setFiles(files);
  };
  return (
    <FileUploader handleChange={handleChange} name="files" types={fileTypes} />
  );
}

export default Drag;