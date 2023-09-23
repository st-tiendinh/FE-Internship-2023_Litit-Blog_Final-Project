import {
  HIDE_MODAL,
  SET_CONFIRM,
  SET_CONFIRM_DELETE_ID,
  SET_CONFIRM_TYPE,
  SHOW_MODAL,
} from '../types/confirmModal';

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

export const setConfirmModalType = (type: any) => {
  return {
    type: SET_CONFIRM_TYPE,
    payload: { type },
  };
};

export const setConfirmModalId = (id: any) => {
  return {
    type: SET_CONFIRM_DELETE_ID,
    payload: { id },
  };
};
