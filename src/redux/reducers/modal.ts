import {
  HIDE_MODAL,
  SET_CONFIRM,
  SHOW_MODAL,
} from '../types/confirmModal';

export interface ConfirmModalStateProps {
  isShow: boolean;
  isConfirm: boolean;
  confirmCallback: any;
  type: string;
  message: string;
  onConfirm: any;
}

const initialState = {
  isShow: false,
  isConfirm: false,
  confirmCallback: () => {},
  type: '',
  message: '',
  onConfirm: () => {},
};

export const modalReducer = (state = initialState, action: any) => {
  const objReducer: Record<string, () => ConfirmModalStateProps> = {
    [SHOW_MODAL]: () => ({
      ...state,
      isShow: true,
      isConfirm: false,
      id: action.payload.id,
      type: action.payload.type,
      message: action.payload.message,
      onConfirm: action.payload.onConfirm,
    }),

    [HIDE_MODAL]: () => ({
      ...state,
      isShow: false,
      isConfirm: false,
    }),

    [SET_CONFIRM]: () => ({
      ...state,
      isShow: false,
      confirmCallback: action.payload.confirmCallback,
      isConfirm: true,
    }),
  };

  return typeof objReducer[action.type] === 'function' ? objReducer[action.type]() : state;
};
