import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-page">
      <Outlet />
    </div>
  );
};

export default Auth;
