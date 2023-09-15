import { AnyAction } from 'redux';
import { all, put, takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from './constants/types';
import { AuthService } from '../services/auth.service';
import { signInSuccess, signInError, signOutSuccess, signOutError } from './auth.actions';
import { KEYS } from '../helpers/storageHelper';

const auth = new AuthService();

export function* signin({ payload }: AnyAction): any {
  try {
    // call api login
    const res = yield auth.signIn(payload).then((res) => res);
    // set token into localStorage
    auth.setToken(res.accessToken);
    // handle successful response
    yield put(signInSuccess(res));
  } catch (error) {
    // handle error response
    yield put(signInError(error));
  }
}

export function* signout(): any {
  try {
    const res = yield auth.signOut().then((res) => res);
    auth.removeToken();
    localStorage.removeItem(KEYS.USER_INFO);
    yield put(signOutSuccess(res));
  } catch (error) {
    yield put(signOutError(error));
  }
}

export function* watchAuth() {
  yield all([takeLatest(ACTION_TYPES.SIGN_IN, signin), takeLatest(ACTION_TYPES.SIGN_OUT, signout)]);
}
