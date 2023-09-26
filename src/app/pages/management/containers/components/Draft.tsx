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

export const Draft = () => {
  const [draftList, setDraftList] = useState<any>([]);
  const id = useSelector((state: RootState) => state.modalReducer.id);
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );
  const isConfirm = useSelector(
    (state: RootState) => state.modalReducer.isConfirm
  );

  useEffect(() => {
    (async () => {
      apiService.setHeaders(jwtHelper.getAuthHeader());
      const res: any = await apiService.get([ENDPOINT.posts.draft]);
      const draftData = res.map((post: IPost) => {
        return { ...post, user: userInfo };
      });
      const sortedDraft = draftData.sort((a: IPost, b: IPost) => {
        return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
      });
      setDraftList(sortedDraft);
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
      <PostList posts={draftList} type={PostListType.LIST} isHasAction={true} />
    </section>
  );
};
