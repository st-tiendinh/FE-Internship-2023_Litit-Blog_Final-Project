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
          <div className="col col-8 col-md-12 col-sm-12">
            <PublicPost type={PostListType.LIST} sectionTitle="LATEST POSTS" />
          </div>
          <div className="col col-4 col-md-12 col-sm-12">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
