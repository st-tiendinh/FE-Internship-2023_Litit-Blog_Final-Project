import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-articles">
      <Outlet />
    </div>
  );
};

export default Articles;
