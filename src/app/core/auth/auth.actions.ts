import ACTION_TYPES from './constants/types';

export const signIn = (account: object) => ({
  type: ACTION_TYPES.SIGN_IN,
  payload: account,
});

export const signInSuccess = (payload: any) => ({
  type: ACTION_TYPES.SIGN_IN_SUCCESS,
  payload,
});

export const signInError = (payload: any) => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload,
});
