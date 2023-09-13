import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../auth.actions';

const Login = () => {
  const dispatch = useDispatch();

  const onLogin = () => {
    const account = { email: 'quan.do@supremetech.vn', password: 'abc@1234' };
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
