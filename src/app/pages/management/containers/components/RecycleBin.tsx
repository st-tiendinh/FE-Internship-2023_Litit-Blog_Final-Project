import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Modal } from '../../../../shared/components';
import PostList from '../../../../shared/components/PostList';

import { RootState } from '../../../../app.reducers';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { PostListType } from '../../../home/containers/components/PublicPost';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const RecycleBin = () => {
  const [deletedPosts, setDeletedPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleRecycle, setToggleRecycle] = useState<boolean>(false);
  const id = useSelector((state: RootState) => state.modalReducer.id);

  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const type = useSelector((state: RootState) => state.modalReducer.type);

  const handleRestore = () => {
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.put([ENDPOINT.posts.index, `${id}/restore`]);
        setToggleRecycle(!toggleRecycle);
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
  }, [toggleRecycle]);

  useEffect(() => {
    if (deletedPosts.length > 0) {
      setVisiblePosts(deletedPosts.slice(0, 5));
    }
  }, [deletedPosts]);

  const handleLoadMore = () => {
    const startIndex = page * 5;
    let endIndex = startIndex + 5;
    if (endIndex > deletedPosts.length) {
      endIndex = startIndex + (Number(deletedPosts.length) - Number(startIndex));
    }
    const newPosts = deletedPosts.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="section section-recycle-bin">
      <Modal action={type === 'restore' && handleRestore} />

      {isLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <PostList posts={visiblePosts} type={PostListType.LIST} isCanRestore={true} />
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
