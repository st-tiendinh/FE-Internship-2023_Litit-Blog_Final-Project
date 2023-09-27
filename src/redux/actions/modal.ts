import { ModalType } from '../../app/shared/components/Modal';
import { HIDE_MODAL, SET_CONFIRM, SHOW_MODAL } from '../types/confirmModal';

export interface ModalPayload {
  id?: number;
  type?: ModalType;
  message?: string;
  onConfirm?: () => void;
  content?: any;
}

export const setShowModal = ({
  id,
  type,
  message,
  onConfirm,
  content,
}: ModalPayload) => {
  return {
    type: SHOW_MODAL,
    payload: { id, type, message, onConfirm, content },
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
