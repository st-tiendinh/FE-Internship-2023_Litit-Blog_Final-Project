import { ToastTypes } from '../../app/shared/components/Toast';
import { SHOW_TOAST, HIDE_TOAST } from '../types/toast';

export const setShowToast = ({
  message,
  type,
  title,
}: {
  message: string;
  type: ToastTypes;
  title: string;
}) => {
  return {
    type: SHOW_TOAST,
    payload: { message, type, title },
  };
};

export const setHideToast = () => {
  return {
    type: HIDE_TOAST,
  };
};
