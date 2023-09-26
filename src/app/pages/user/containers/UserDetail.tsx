import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserProfile } from './components/UserProfile';
import { UserSideBar } from './components/UserSidebar';
import PostList, { PostStatus } from '../../../shared/components/PostList';

import JwtHelper from '../../../core/helpers/jwtHelper';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';
import { PostListType } from '../../home/containers/components/PublicPost';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { Dropdown } from '../../../shared/components';

export enum FilterType {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
  MORE_POPULAR = 'More popular',
}

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const [userStatistic, setUserStatistic] = useState<any>({});
  const [userPosts, setUserPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filter, setFilter] = useState<any>(FilterType.LATEST);
  const [search, setSearch] = useState<string>('');
  const [searchArr, setSearchArr] = useState<any>([]);
  const debounceSearch = useDebounce(search);

  const isConfirm = useSelector(
    (state: RootState) => state.modalReducer.isConfirm
  );
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;
  const modalId = useSelector((state: RootState) => state.modalReducer.id);

  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const isCurrentUser = jwtHelper.isCurrentUser(
          +`${location.pathname.split('/').pop()}`
        );
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = isCurrentUser
          ? await apiService.get([ENDPOINT.users.index, 'me/posts'])
          : await apiService.get([ENDPOINT.users.index, `${userId}/posts`]);
        setUser(response);
        const postPublicQuantity = await response.Posts.filter(
          (post: any) => post.status === PostStatus.PUBLIC
        ).length;

        const commentQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.comments,
          0
        );

        const likeQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.likes,
          0
        );

        const tagQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.tags.length,
          0
        );

        setUserStatistic({
          postPublicQuantity: postPublicQuantity,
          commentQuantity: commentQuantity,
          tagQuantity: tagQuantity,
          likeQuantity: likeQuantity,
        });

        const { Posts, ...other } = response;

        const newPostsArr = response.Posts.map((item: any) => {
          const newPost = { ...item, user: other };
          return newPost;
        }).sort((a: any, b: any) => {
          return (
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        });
        setUserPost(newPostsArr);
        setSearchArr(newPostsArr);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [location, isLoggedUser, userId]);

  useEffect(() => {
    if (isConfirm && modalId !== 0) {
      setSearchArr((prevPosts: any) => {
        const newPosts = prevPosts.filter((post: any) => post.id !== modalId);
        return newPosts;
      });
    }
  }, [isConfirm]);

  useEffect(() => {
    if (debounceSearch.trim() === '') {
      const filteredData = filterData(userPosts, filter);
      setSearchArr(filteredData);
    } else {
      const resultData = userPosts.filter((item: any) =>
        item.title.toLowerCase().includes(debounceSearch.toLowerCase())
      );
      const filteredData = filterData(resultData, filter);
      setSearchArr(filteredData);
    }
  }, [debounceSearch, filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPage(1);
    setVisiblePosts(searchArr.slice(0, 5));
  }, [searchArr, filter, search]);

  const handleLoadMore = () => {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    const newPosts = searchArr.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  const filterData = (data: any, filterType: FilterType) => {
    switch (filterType) {
      case FilterType.LATEST:
        data.sort((a: any, b: any) => {
          return (
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        });
        break;

      case FilterType.OLDEST:
        data.sort((a: any, b: any) => {
          return (
            (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
          );
        });
        break;

      case FilterType.MORE_POPULAR:
        data.sort((a: any, b: any) => {
          return b.likes - a.likes;
        });
        break;

      default:
        break;
    }

    return data;
  };

  return (
    <div className="page-user">
      <div className="container">
        {isLoading ? (
          <div className="skeleton skeleton-user-profile"></div>
        ) : (
          <UserProfile isLoggedUser={isLoggedUser} user={user} />
        )}
        <section className="section section-wrapper">
          <div className="row">
            <div className="col col-4">
              {isLoading ? (
                <div className="skeleton skeleton-user-sidebar"></div>
              ) : (
                <UserSideBar userStatistic={userStatistic} />
              )}
            </div>
            <div className="col col-8">
              <div className="d-flex filter-container">
                <div className="select-container">
                  <Dropdown
                    options={Object.values(FilterType)}
                    option={filter}
                    setOption={setFilter}
                  />
                </div>

                <div className="d-flex search-box">
                  <label htmlFor="search-input">
                    <i className="icon icon-search"></i>
                  </label>
                  <input
                    id="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="search-input"
                    type="text"
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="skeleton skeleton-personal-list"></div>
              ) : (
                <PostList
                  posts={visiblePosts}
                  type={PostListType.LIST}
                  isHasAction={!!isLoggedUser}
                />
              )}
              {visiblePosts.length < searchArr.length && (
                <div className="d-flex load-more-btn-wrap">
                  <button className="btn btn-outline" onClick={handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetail;
