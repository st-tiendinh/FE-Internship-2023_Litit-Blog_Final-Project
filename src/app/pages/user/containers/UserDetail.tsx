import PublicPost, {
  PostListType,
} from '../../home/containers/components/PublicPost';

const UserDetail = () => {
  return (
    <>
      <h1>This is user detail</h1>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <PublicPost type={PostListType.LIST} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
