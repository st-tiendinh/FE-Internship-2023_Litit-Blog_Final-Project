import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from '../../../../shared/components/PostList';

import { RootState } from '../../../../app.reducers';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { PostListType } from '../../../home/containers/components/PublicPost';
import { setShowToast } from '../../../../../redux/actions/toast';
import { ToastTypes } from '../../../../shared/components/Toast';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const RecycleBin = () => {
  const [deletedPosts, setDeletedPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isConfirm = useSelector(
    (state: RootState) => state.modalReducer.isConfirm
  );
  const modalId = useSelector((state: RootState) => state.modalReducer.id);

  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.posts.recyclebin]);
        setDeletedPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (deletedPosts.length >= 0) {
      setVisiblePosts(deletedPosts.slice(0, 5));
    }
  }, [deletedPosts]);

  const handleLoadMore = () => {
    const startIndex = page * 5;
    let endIndex = startIndex + 5;
    if (endIndex > deletedPosts.length) {
      endIndex =
        startIndex + (Number(deletedPosts.length) - Number(startIndex));
    }
    const newPosts = deletedPosts.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (isConfirm && modalId !== 0) {
      setDeletedPosts((prevPosts: any) => {
        const newPosts = prevPosts.filter((post: any) => post.id !== modalId);
        return newPosts;
      });
    }
  }, [isConfirm]);

  return (
    <div className="section section-recycle-bin">
      {isLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <PostList
          posts={visiblePosts}
          type={PostListType.LIST}
          isCanRestore={true}
        />
      )}
      {visiblePosts.length < deletedPosts.length && (
        <div className="d-flex load-more-btn-wrap">
          <button className="btn btn-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
