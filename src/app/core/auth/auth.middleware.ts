import { AnyAction } from 'redux';
import { put, takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from './constants/types';
import { AuthService } from '../services/auth.service';
import { signInSuccess, signInError } from './auth.actions';

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

export function* watchAuth() {
  yield takeLatest(ACTION_TYPES.SIGN_IN, signin);
}
