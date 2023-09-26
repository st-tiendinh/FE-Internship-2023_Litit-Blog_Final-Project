import { useState, useEffect } from 'react';
import PostList, { IPost } from '../../../../shared/components/PostList';
import { PostListType } from '../../../home/containers/components/PublicPost';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app.reducers';
import { Modal } from '../../../../shared/components';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const Draft = () => {
  const [draftList, setDraftList] = useState<any>([]);
  const [toggleDeletedPost, setToggleDeletedPost] = useState<boolean>(false);

  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );
  const id = useSelector((state: RootState) => state.modalReducer.id);
  const type = useSelector((state: RootState) => state.modalReducer.type);

  const handleSoftDelete = () => {
    (async () => {
      apiService.setHeaders(jwtHelper.getAuthHeader());
      await apiService.delete([ENDPOINT.posts.index, `${id}`]);
      setToggleDeletedPost(!toggleDeletedPost);
    })();
  };

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
  }, [toggleDeletedPost]);

  return (
    <section className="section section-draft">
      {/* <Modal action={type === 'delete' && handleSoftDelete} /> */}
      <PostList posts={draftList} type={PostListType.LIST} isHasAction={true} />
    </section>
  );
};
