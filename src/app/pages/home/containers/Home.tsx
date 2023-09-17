import { Sidebar } from '../../../shared/components';
import PublicPost from './components/PublicPost';

const Home = () => {
  return (
    <div className="page-home">
      <div className="container">
        <div className="row">
          <div className="col col-8">
            <PublicPost />
          </div>
          <div className="col col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
