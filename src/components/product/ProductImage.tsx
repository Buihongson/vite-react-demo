import { useState } from "react";
import Dropzone, { IFileWithPreview } from "../form/Dropzone";

interface ProductImageProps {
  onImagesChange?: (files: IFileWithPreview[]) => void;
  initialImages?: IFileWithPreview[];
  label?: string;
  error?: string;
  maxFiles?: number;
}

export default function ProductImage({
  onImagesChange,
  initialImages = [],
  error,
  maxFiles = 10,
}: ProductImageProps) {
  const [files, setFiles] = useState<IFileWithPreview[]>(initialImages);

  const handleDrop = (newFiles: IFileWithPreview[]) => {
    let updatedFiles = [...newFiles];

    if (maxFiles > 1) {
      updatedFiles = [...files, ...newFiles];
    }
    setFiles(updatedFiles);
    onImagesChange?.(updatedFiles);
  };

  const handleRemove = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
    onImagesChange?.(updatedFiles);
  };

  return (
    <div className="w-full">
      <Dropzone
        placeholder="Drag & drop product images here, or click to select files"
        dragActiveText="Drop the images here..."
        accept={{
          "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
        }}
        multiple={true}
        maxFiles={maxFiles}
        maxSize={5242880} // 5MB
        value={files}
        onDrop={handleDrop}
        onRemove={handleRemove}
        error={error}
      />
    </div>
  );
}
