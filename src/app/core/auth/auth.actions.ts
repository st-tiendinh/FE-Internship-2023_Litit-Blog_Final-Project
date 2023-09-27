import ACTION_TYPES from './constants/types';

export const signIn = (account: object) => ({
  type: ACTION_TYPES.SIGN_IN,
  payload: account,
});

export const signInSuccess = (payload: any) => ({
  type: ACTION_TYPES.SIGN_IN_SUCCESS,
  payload,
});

export const signInGoogleSuccess = (payload: any) => ({
  type: ACTION_TYPES.SIGN_IN_GOOGLE_SUCCESS,
  payload,
});

export const signInError = (payload: any) => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload,
});

export const signOut = () => ({
  type: ACTION_TYPES.SIGN_OUT,
});

export const signOutSuccess = (payload: any) => ({
  type: ACTION_TYPES.SIGN_OUT_SUCCESS,
  payload,
});

export const signOutError = (payload: any) => ({
  type:
    payload.response.data.errors[0] === 'You can not logout with this account.'
      ? ACTION_TYPES.SIGN_OUT_SUCCESS
      : ACTION_TYPES.SIGN_OUT_ERROR,
  payload:
    payload.response.data.errors[0] === 'You can not logout with this account.' ? null : payload,
});

export const updateUser = (account: object) => ({
  type: ACTION_TYPES.UPDATE_USER,
  payload: account,
});

export const updateUserSuccess = (payload: any) => ({
  type: ACTION_TYPES.UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserError = (payload: any) => ({
  type: ACTION_TYPES.UPDATE_USER_ERROR,
  payload,
});
