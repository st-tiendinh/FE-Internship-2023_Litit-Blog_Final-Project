import { Sidebar } from '../../../shared/components';
import PublicPost, { PostListType } from './components/PublicPost';
import { RecommendPosts } from './components/RecommendPosts';

const Home = () => {
  return (
    <div className="page-home">
      <div className="container">
        <RecommendPosts />
        <div className="row">
          <div className="col col-8">
            <PublicPost type={PostListType.GRID} sectionTitle="Latest post" />
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
