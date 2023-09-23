import React from 'react';

interface ToggleButtonProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = ({ isPublic, setIsPublic }: ToggleButtonProps) => {
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  return (
    <span className="toggle-button-wrapper" onClick={handleToggle}>
      <input
        className="toggle-button"
        type="checkbox"
        id="toggle-button"
        checked={isPublic}
        onChange={() => {}}
      />
      <label className="toggle-button-label" htmlFor="toggle-button"></label>
    </span>
  );
};

export default ToggleButton;
