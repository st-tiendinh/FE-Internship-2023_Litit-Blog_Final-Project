import React from 'react';

interface TogglePreviewProps {
  isShowPreview: boolean;
  setIsShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  handlePreview?: () => void;
}

export const TogglePreview = ({
  isShowPreview,
  setIsShowPreview,
  handlePreview,
}: TogglePreviewProps) => {
  const handleToggle = () => {
    setIsShowPreview(!isShowPreview);
    handlePreview && handlePreview();
  };

  return (
    <span className="toggle-button-wrapper" onClick={handleToggle}>
      <input
        className="toggle-button-preview"
        type="checkbox"
        id="toggle-preview"
        checked={!isShowPreview}
        onChange={() => {}}
      />
      <label className="toggle-button-label" htmlFor="toggle-preview"></label>
    </span>
  );
};
