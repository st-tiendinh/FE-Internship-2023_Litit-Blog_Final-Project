import {
  HIDE_MODAL,
  SET_CONFIRM,
  SET_CONFIRM_DELETE_ID,
  SET_CONFIRM_TYPE,
  SHOW_MODAL,
} from '../types/confirmModal';

export interface ConfirmModalStateProps {
  isShow: boolean;
  isConfirm: boolean;
  confirmCallback: any;
  id: number;
  type: string;
}

const initialState = {
  isShow: false,
  isConfirm: false,
  confirmCallback: () => {},
  id: 0,
  type: '',
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

    [SET_CONFIRM_TYPE]: () => ({
      ...state,
      type: action.payload.type,
    }),

    [SET_CONFIRM_DELETE_ID]: () => ({
      ...state,
      id: action.payload.id,
    }),
  };

  return typeof objReducer[action.type] === 'function' ? objReducer[action.type]() : state;
};
