import { Outlet } from 'react-router-dom';

const Page = () => {
  return (
    <div className="pages-container">
      <Outlet />
    </div>
  );
};

export default Page;
