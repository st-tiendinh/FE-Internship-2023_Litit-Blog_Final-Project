import { SHOW_TOAST, HIDE_TOAST } from '../types/toast';

export interface ToastStateProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  isVisible: boolean;
}

const initialState: ToastStateProps = {
  message: '',
  type: 'success',
  isVisible: false,
};

export const toastReducer = (state = initialState, action: any) => {
  const objReducer: Record<string, () => ToastStateProps> = {
    [SHOW_TOAST]: () => ({
      ...state,
      message: action.payload.message,
      type: action.payload.type,
      isVisible: true,
    }),

    [HIDE_TOAST]: () => ({
      ...state,
      isVisible: false,
    }),
  };

  return typeof objReducer[action.type] === 'function' ? objReducer[action.type]() : state;
}