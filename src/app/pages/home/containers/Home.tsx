import { useEffect } from 'react';

import { Sidebar } from '../../../shared/components';
import PublicPost, { PostListType } from './components/PublicPost';
import { RecommendPosts } from './components/RecommendPosts';

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="page-home">
      <div className="container">
        <RecommendPosts />
        <div className="row">
          <div className="col col-8">
            <PublicPost type={PostListType.LIST} sectionTitle="LATEST POSTS" />
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
