import { createReducer } from '../helpers/reducer-factory';
import { KEYS, getLS } from '../helpers/storageHelper';
import ACTION_TYPES from './constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: getLS(KEYS.ACCESS_TOKEN),
  error: null,
};

const signInSuccess = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  data: payload,
  error: null,
});

const signInError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const signIn = (state: any, payload: any) => ({
  ...state,
  isLoading: true,
  payload,
});

const strategies = {
  [ACTION_TYPES.SIGN_IN_SUCCESS]: signInSuccess,
  [ACTION_TYPES.SIGN_IN]: signIn,
  [ACTION_TYPES.SIGN_IN_ERROR]: signInError,
  __default__: (state: any) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
