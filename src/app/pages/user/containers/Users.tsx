import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <div className="users-page">
      <Outlet />
    </div>
  );
};

export default Users;
