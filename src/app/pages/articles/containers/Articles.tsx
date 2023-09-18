import { Outlet } from 'react-router-dom';

const Articles = () => {
  return (
    <div className="articles-page">
      <Outlet />
    </div>
  );
};

export default Articles;
