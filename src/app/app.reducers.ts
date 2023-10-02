import { combineReducers } from 'redux';

import authReducer from './core/auth/auth.reducers';
import { modalReducer } from '../redux/reducers/modal';
import { toastReducer } from '../redux/reducers/toast';

const appReducer = combineReducers({
  authReducer,
  modalReducer,
  toastReducer,
});

export default appReducer;

export type RootState = ReturnType<typeof appReducer>;
