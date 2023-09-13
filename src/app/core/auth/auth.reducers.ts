import { createReducer } from '../helpers/reducer-factory';
import ACTION_TYPES from './constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
};

const signInSuccess = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  data: payload.data,
});

const signInError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload.error,
});

const signIn = (state: any, payload: any) => ({
  ...state,
  isLoading: true,
});

const strategies = {
  [ACTION_TYPES.SIGN_IN_SUCCESS]: signInSuccess,
  [ACTION_TYPES.SIGN_IN]: signIn,
  [ACTION_TYPES.SIGN_IN_ERROR]: signInError,
  __default__: (state: any) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
