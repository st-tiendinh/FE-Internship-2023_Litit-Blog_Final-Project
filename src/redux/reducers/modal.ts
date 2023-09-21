import { HIDE_MODAL, SET_CONFIRM, SHOW_MODAL } from '../types/confirmModal';

export interface ConfirmModalStateProps {
  isShow: boolean;
  isConfirm: boolean;
  confirmCallback: any;
}

const initialState = {
  isShow: false,
  isConfirm: false,
  confirmCallback: () => {},
};

export const modalReducer = (state = initialState, action: any) => {
  const objReducer: Record<string, () => ConfirmModalStateProps> = {
    [SHOW_MODAL]: () => ({
      ...state,
      isShow: true,
    }),

    [HIDE_MODAL]: () => ({
      ...state,
      isShow: false,
    }),

    [SET_CONFIRM]: () => ({
      ...state,
      isShow: false,
      confirmCallback: action.payload.confirmCallback,
    }),
  };

  return typeof objReducer[action.type] === 'function' ? objReducer[action.type]() : state;
};
