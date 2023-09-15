import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import { signOut } from '../core/auth/auth.actions';
import { RootState } from '../app.reducers';
import { KEYS } from '../core/helpers/storageHelper';

const Page = () => {
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = Cookies.get(KEYS.ACCESS_TOKEN);
    if (!cookie) {
      dispatch(signOut());
    }
  }, [dispatch, isLogged]);

  return (
    <div className="pages-container">
      <Outlet />
    </div>
  );
};

export default Page;
