import { Outlet } from 'react-router-dom';

const Articles = () => {
  return (
    <div className="page-articles">
      <Outlet />
    </div>
  );
};

export default Articles;
