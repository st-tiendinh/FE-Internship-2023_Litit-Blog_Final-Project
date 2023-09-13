import { combineReducers } from 'redux';

import authReducer from './core/auth/auth.reducers';

const appReducer = combineReducers({
  authReducer,
});

export default appReducer;

export type RootState = ReturnType<typeof appReducer>;
