import PublicPost, {
  PostListType,
} from '../../home/containers/components/PublicPost';
import { UserProfile } from './components/UserProfile';

const UserDetail = () => {
  return (
    <div className="page-user">
      <UserProfile />
      <PublicPost type={PostListType.LIST} />
    </div>
  );
};

export default UserDetail;
