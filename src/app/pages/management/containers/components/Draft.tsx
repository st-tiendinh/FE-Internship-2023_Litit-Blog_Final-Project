import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PostList, { IPost } from '../../../../shared/components/PostList';

import { PostListType } from '../../../home/containers/components/PublicPost';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { RootState } from '../../../../app.reducers';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const Draft = () => {
  const [draftList, setDraftList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);

  const id = useSelector((state: RootState) => state.modalReducer.id);
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );
  const isConfirm = useSelector(
    (state: RootState) => state.modalReducer.isConfirm
  );

  const handleLoadMore = () => {
    const startIndex = page * 5;
    let endIndex = startIndex + 5;
    if (endIndex > draftList.length) {
      endIndex = startIndex + (Number(draftList.length) - Number(startIndex));
    }
    const newPosts = draftList.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (draftList.length >= 0) {
      setVisiblePosts(draftList.slice(0, 5));
    }
  }, [draftList]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const res: any = await apiService.get([ENDPOINT.posts.draft]);
        const draftData = res.map((post: IPost) => {
          return { ...post, user: userInfo };
        });
        const sortedDraft = draftData.sort((a: IPost, b: IPost) => {
          return (
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        });
        setDraftList(sortedDraft);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isConfirm && id !== 0) {
      setDraftList((prev: any) => {
        return prev.filter((post: IPost) => post.id !== id);
      });
    }
  }, [isConfirm]);

  return (
    <section className="section section-draft">
      {isLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <PostList
          posts={visiblePosts}
          type={PostListType.LIST}
          isHasAction={true}
        />
      )}
      <div className="d-flex load-more-btn-wrap">
        {visiblePosts.length < draftList.length && (
          <button className="btn btn-outline" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Draft;
