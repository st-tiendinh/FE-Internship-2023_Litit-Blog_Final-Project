import { Outlet } from 'react-router-dom';

const Articles = () => {
  return (
    <div className="articles-page">
      <h1>This is Article page</h1>
      <Outlet />
    </div>
  );
};

export default Articles;
