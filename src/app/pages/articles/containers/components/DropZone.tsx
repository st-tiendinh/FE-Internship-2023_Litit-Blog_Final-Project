import React, { useEffect, useState } from 'react';
import { PostAction } from './EditorForm';

interface DropZoneProps {
  type: PostAction;
  imageSrc: string;
  setImageFile: (imageFile: File | null) => void;
}

const DropZone = ({ type, imageSrc, setImageFile }: DropZoneProps) => {
  const [preview, setPreview] = useState<string>(
    type === PostAction.UPDATE ? imageSrc : ''
  );

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const previewImage = URL.createObjectURL(file);
    setPreview(previewImage);
    setImageFile(file);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewImage = URL.createObjectURL(file);
      setPreview(previewImage);
      setImageFile(file);
    }
  };

  const handleClickImage = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      className="article-editor-drop-zone"
      onDrop={handleDropImage}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        className="article-editor-upload-input"
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleChangeImage}
      />
      {(!!preview && (
        <img
          src={preview}
          alt="Uploaded"
          className="article-editor-image"
          onClick={handleClickImage}
        />
      )) || (
        <div
          className="article-editor-drop-zone-wrapper"
          onClick={handleClickImage}
        >
          <i className="icon icon-cover-uploader"></i>
          <h4 className="article-editor-drop-zone-title">DROP FILE HERE</h4>
          <p className="article-editor-drop-zone-text">
            Drag and drop photo here or click to select photo
          </p>
        </div>
      )}
    </div>
  );
};
export default React.memo(DropZone);
