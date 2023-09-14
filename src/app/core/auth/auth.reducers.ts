import { createReducer } from '../helpers/reducer-factory';
import { KEYS } from '../helpers/storageHelper';
import ACTION_TYPES from './constants/types';
import Cookies from 'js-cookie';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  userInfo: JSON.parse(localStorage.getItem(KEYS.USER_INFO) as string),
  error: null,
  message: null,
  isLogged: !!Cookies.get(KEYS.ACCESS_TOKEN),
};

const signInSuccess = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  data: payload,
  error: null,
  isLogged: true,
  userInfo: payload.userInfo,
});

const signInError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
  isLogged: false,
});

const signIn = (state: any, payload: any) => ({
  ...state,
  isLoading: true,
  payload,
});

const signOutSuccess = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  message: payload,
  error: null,
  isLogged: false,
});

const signOutError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const signOut = (state: any, payload: any) => ({
  ...state,
  isLoading: true,
  payload,
  isLogged: false,
});

const strategies = {
  [ACTION_TYPES.SIGN_IN]: signIn,
  [ACTION_TYPES.SIGN_IN_SUCCESS]: signInSuccess,
  [ACTION_TYPES.SIGN_IN_ERROR]: signInError,
  [ACTION_TYPES.SIGN_OUT]: signOut,
  [ACTION_TYPES.SIGN_OUT_SUCCESS]: signOutSuccess,
  [ACTION_TYPES.SIGN_OUT_ERROR]: signOutError,
  __default__: (state: any) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
