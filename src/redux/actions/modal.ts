import { ModalType } from '../../app/shared/components/Modal';
import {
  HIDE_MODAL,
  SET_CANCEL,
  SET_CONFIRM,
  SET_IS_LOADING,
  SHOW_MODAL,
} from '../types/confirmModal';

export interface ModalPayload {
  id?: number;
  type?: ModalType;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  content?: any;
}

export const setShowModal = ({
  id,
  type,
  message,
  onConfirm,
  onCancel,
  content,
}: ModalPayload) => {
  return {
    type: SHOW_MODAL,
    payload: { id, type, message, onConfirm, onCancel, content },
  };
};

export const setHideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const setConfirmModal = (confirmCallback: any) => {
  return {
    type: SET_CONFIRM,
    payload: { confirmCallback },
  };
};

export const setCancelModal = (cancelCallback: any) => {
  return {
    type: SET_CANCEL,
    payload: { cancelCallback },
  };
};

export const setIsLoading = (isLoading: boolean) => {
  return {
    type: SET_IS_LOADING,
    payload: { isLoading },
  };
};
