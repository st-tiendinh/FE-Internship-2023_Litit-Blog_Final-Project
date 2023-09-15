import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <div className="users-page" style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default Users;
