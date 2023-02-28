import React, { useState } from "react";

interface MyFile extends File {
  id: string;
  createdAt: Date;
}

function FileUploadPreview() {
  const [selectedFiles, setSelectedFiles] = useState<MyFile[]>([]);

  const handleFileSelect = (event) => {
    console.log(event.target.files);

    const files = [...event.target.files];
    setSelectedFiles(files);
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {selectedFiles.map((file) => (
        <img
          className="w-[200px]  object-top h-[200px] object-cover rounded-full"
          key={file.name}
          src={URL.createObjectURL(file)}
          alt={file.name}
        />
      ))}
    </div>
  );
}

export default FileUploadPreview;
