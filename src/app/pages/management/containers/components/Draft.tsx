import { useState, useEffect } from 'react';
import PostList, { IPost } from '../../../../shared/components/PostList';
import { PostListType } from '../../../home/containers/components/PublicPost';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app.reducers';

const apiService = new ApiService();
const jwt = new JwtHelper();

export const Draft = () => {
  const [draftList, setDraftList] = useState<any>([]);
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  useEffect(() => {
    (async () => {
      apiService.setHeaders(jwt.getAuthHeader());
      const res: any = await apiService.get([ENDPOINT.posts.draft]);
      const draftData = res.map((post: IPost) => {
        return { ...post, user: userInfo };
      });
      setDraftList(draftData);
    })();
  }, []);

  return (
    <section className="section section-draft">
      <PostList posts={draftList} type={PostListType.LIST} isHasAction={true} />
    </section>
  );
};
