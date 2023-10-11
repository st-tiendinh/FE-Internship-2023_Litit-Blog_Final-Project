import React, { useEffect, useState } from 'react';
import { PostStatus } from './PostList';

interface ToggleButtonProps {
  status: PostStatus;
  setStatus: (status: PostStatus) => void;
}

const ToggleButton = ({ status, setStatus }: ToggleButtonProps) => {
  const [isPublic, setIsPublic] = useState<boolean>(
    status === PostStatus.PUBLIC ? true : false
  );

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  useEffect(() => {
    isPublic && setStatus(PostStatus.PUBLIC);
    !isPublic && setStatus(PostStatus.PRIVATE);
  }, [isPublic]);

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

export default React.memo(ToggleButton);
