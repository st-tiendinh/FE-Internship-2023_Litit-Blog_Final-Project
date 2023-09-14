import { useEffect } from 'react';

export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

interface ToastProps {
  type: ToastTypes;
  title: string;
  desc: string;
  isShow: boolean;
  onClose: () => void;
}

export const Toast = ({ type, title, desc, isShow, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${isShow ? 'active' : ''} toast-${type}`}>
      <div className="d-flex toast-content">
        <span className="icon-wrap">
          <i className={`icon icon-${type}`}></i>
        </span>
        <div className="toast-message">
          <span className="toast-title">{title}</span>
          <span className="toast-desc">{desc}</span>
        </div>
      </div>
      <button className="toast-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};
