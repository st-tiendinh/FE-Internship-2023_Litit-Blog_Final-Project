import React, { useState, ChangeEvent, useEffect } from 'react';

interface AvatarUploaderProps {
  initialSrc?: string;
  onSrcChange: (newSrc: string) => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  initialSrc,
  onSrcChange,
}) => {
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const handleClick = () => {
    const inputElement = document.querySelector(
      '.avatar-uploader-input'
    ) as HTMLInputElement;

    if (inputElement) {
      inputElement.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const newSrc = event.target?.result as string;
        setSrc(newSrc);
        onSrcChange(newSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-uploader">
      <form className="avatar-uploader-form">
        <input
          className="avatar-uploader-input"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <img className="avatar-uploader-image" src={src} alt="User Avatar" />
        <div className="avatar-uploader-icon" onClick={handleClick}>
          <i className="icon icon-avatar-uploader"></i>
        </div>
      </form>
    </div>
  );
};
