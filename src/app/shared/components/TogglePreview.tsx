import React from 'react';
import { useEffect } from 'react';

interface TogglePreviewProps {
  isShowPreview: boolean;
  setIsShowPreview: (isShowPreview: boolean) => void;
  handlePreview: () => void;
}

const TogglePreview = ({
  isShowPreview,
  setIsShowPreview,
  handlePreview,
}: TogglePreviewProps) => {
  const handleToggle = () => {
    setIsShowPreview(!isShowPreview);
  };

  useEffect(() => {
    isShowPreview && handlePreview();
  }, [isShowPreview]);

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

export default React.memo(TogglePreview);
