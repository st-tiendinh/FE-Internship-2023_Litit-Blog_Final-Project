import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-page">
      Auth component works!
      <Outlet />
    </div>
  );
};

export default Auth;
