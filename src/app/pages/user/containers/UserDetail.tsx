import { UserPersonalPosts } from './components/UserPersonalPosts';
import { UserProfile } from './components/UserProfile';
import { UserSideBar } from './components/UserSidebar';

const UserDetail = () => {
  return (
    <div className="page-user">
      <UserProfile />
      <section className="section section-wrapper">
        <div className="container">
          <div className="row">
            <div className="col col-4">
              <UserSideBar />
            </div>
            <div className="col col-8">
              <UserPersonalPosts />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetail;
