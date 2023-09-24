import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app.reducers';
import { setHideToast } from '../../../redux/actions/toast';

export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

// interface ToastProps {
//   type: ToastTypes;
//   title: string;
//   desc: string;
//   isShow: boolean;
//   onClose: () => void;
// }

export const Toast = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.toastReducer.message);
  const type = useSelector((state: RootState) => state.toastReducer.type);
  const isVisible = useSelector((state: RootState) => state.toastReducer.isVisible);

  const handleHideToast = () => {
    const action = setHideToast();
    if (action) {
      dispatch(action);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleHideToast();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`toast ${isVisible ? 'active' : ''} toast-${type}`}>
      <div className="d-flex toast-content">
        <span className="icon-wrap">
          <i className={`icon icon-${type}`}></i>
        </span>
        <div className="toast-message">
          <span className="toast-title">{type}</span>
          <span className="toast-desc">{message}</span>
        </div>
      </div>
      <button className="toast-btn" onClick={handleHideToast}>
        &times;
      </button>
    </div>
  );
};
