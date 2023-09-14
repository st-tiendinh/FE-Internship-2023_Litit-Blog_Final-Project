import { all } from 'redux-saga/effects';

import { watchAuth } from './core/auth/auth.middleware';

export default function* appMiddleware() {
  yield all([watchAuth()]);
}
