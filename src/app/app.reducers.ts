import { combineReducers } from 'redux';

import authReducer from './core/auth/auth.reducers';
import { modalReducer } from './redux/reducers/modal';

const appReducer = combineReducers({
  authReducer,
  modalReducer,
});

export default appReducer;

export type RootState = ReturnType<typeof appReducer>;
