import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label?: string;
  options: any;
  option: any;
  setOption: React.Dispatch<React.SetStateAction<any>>;
}

export const Dropdown = ({
  options,
  option,
  setOption,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleCLick = (item: any) => {
    setOption(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      <div
        className={`d-flex dropdown-select ${isOpen ? 'active' : null}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label && (
          <label className={`select-label ${isOpen ? 'active' : null}`}>
            {label}
          </label>
        )}
        <span className="select">{option}</span>
        <i className="icon icon-arrow"></i>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((item: any, index: number) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleCLick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
