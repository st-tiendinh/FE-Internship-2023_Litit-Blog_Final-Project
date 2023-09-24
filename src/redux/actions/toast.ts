import { SHOW_TOAST, HIDE_TOAST } from '../types/toast';

export const setShowToast = ({
  message,
  type,
}: {
  message: string;
  type: 'success' | 'error' | 'warning';
}) => {
  return {
    type: SHOW_TOAST,
    payload: { message, type },
  };
};

export const setHideToast = () => {
  return {
    type: HIDE_TOAST,
  };
};
