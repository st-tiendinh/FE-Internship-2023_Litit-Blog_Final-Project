import {
  HIDE_MODAL,
  SET_CONFIRM,
  SHOW_MODAL,
} from '../types/confirmModal';

export const setShowModal = ({ id, type, message, onConfirm }: any) => {
  return {
    type: SHOW_MODAL,
    payload: { id, type, message, onConfirm },
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
