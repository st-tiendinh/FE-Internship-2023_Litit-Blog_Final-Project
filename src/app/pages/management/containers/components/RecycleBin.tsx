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

  return (
    <div className="section section-recycle-bin">
      <Modal action={type === 'restore' && handleRestore} />
      {isLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <PostList
          posts={deletedPosts}
          type={PostListType.LIST}
          isCanRestore={true}
        />
      )}
    </div>
  );
};
