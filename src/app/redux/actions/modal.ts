import { HIDE_MODAL, SET_CONFIRM, SHOW_MODAL } from '../types/confirmModal';

export const setShowModal = () => {
  return {
    type: SHOW_MODAL,
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
