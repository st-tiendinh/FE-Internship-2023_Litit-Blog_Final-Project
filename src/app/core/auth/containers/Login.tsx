import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../auth.actions';
import { RootState } from '../../../app.reducers';
import JwtHelper from '../../helpers/jwtHelper';
import { ApiService } from '../../services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';

const Login = () => {
  const jwtHelper = useMemo(() => new JwtHelper(), []);
  const http = useMemo(() => new ApiService(), []);
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.authReducer.data);
  useEffect(() => {
    if (data) {
      http
        .get([ENDPOINT.users.index, jwtHelper.getUserInfo().userId.toString()])
        .then((res) => console.log(res));
    }
  }, [data, http, jwtHelper]);

  const onLogin = () => {
    const account = { email: 'quan.do@supremetech.vn', password: 'abc@12345' };
    dispatch(signIn(account));
  };

  return (
    <>
      <h1>This is login page</h1>
      <button onClick={onLogin}>Login</button>
    </>
  );
};

export default Login;
