import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Dropdown } from '../../../../shared/components';
import PostList from '../../../../shared/components/PostList';

import JwtHelper from '../../../../core/helpers/jwtHelper';
import { PostListType } from '../../../home/containers/components/PublicPost';
import { ApiService } from '../../../../core/services/api.service';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { RootState } from '../../../../app.reducers';
import { ENDPOINT } from '../../../../../config/endpoint';

export enum FilterType {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
  MORE_POPULAR = 'More popular',
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const UserPersonalPost = () => {
  const location = useLocation();
  const userId = location.pathname.slice(7);

  const [userPosts, setUserPost] = useState<any>([]);
  const [isFetchDataLoading, setIsFetchDataLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>(FilterType.LATEST);
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [searchArr, setSearchArr] = useState<any>([]);
  const debounceSearch = useDebounce(search);
  const isConfirm = useSelector(
    (state: RootState) => state.modalReducer.isConfirm
  );
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;
  const modalId = useSelector((state: RootState) => state.modalReducer.id);
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

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
          return b?.likes - a?.likes;
        });
        break;

      case FilterType.PUBLIC:
        data = data.filter((post: any) => {
          return post.status === 'public';
        });
        break;

      case FilterType.PRIVATE:
        data = data.filter((post: any) => {
          return post.status === 'private';
        });
        break;

      default:
        break;
    }

    return data;
  };

  const handleLoadMore = () => {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    const newPosts = searchArr.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsFetchDataLoading(true);
        const isCurrentUser = jwtHelper.isCurrentUser(
          +`${location.pathname.split('/').pop()}`
        );
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = isCurrentUser
          ? await apiService.get([ENDPOINT.users.index, 'me/posts'])
          : await apiService.get([ENDPOINT.users.index, `${userId}/posts`]);
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
        setIsFetchDataLoading(false);
      } catch (error) {
        console.log(error);
        setIsFetchDataLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setUserPost(
      userPosts.filter((post: any) => {
        return post.id !== modalId;
      })
    );
  }, [modalId]);

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
    setPage(1);
    setVisiblePosts(searchArr.slice(0, 5));
  }, [searchArr, filter, search]);

  useEffect(() => {
    if (!isLoggedUser) {
      setFilterOptions(
        Object.values(FilterType).filter((type) => {
          return type !== FilterType.PUBLIC && type !== FilterType.PRIVATE;
        })
      );
    }
  }, []);

  return (
    <section className="section section-user-personal-post">
      {isFetchDataLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <>
          {userPosts.length ? (
            <div className="d-flex filter-container">
              <div className="select-container">
                <Dropdown
                  options={
                    !isLoggedUser ? filterOptions : Object.values(FilterType)
                  }
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
                  className="search-input"
                  type="text"
                />
              </div>
            </div>
          ) : null}
          <PostList
            posts={visiblePosts}
            type={PostListType.LIST}
            isHasAction={!!isLoggedUser}
          />
        </>
      )}
      {visiblePosts.length < searchArr.length && (
        <div className="d-flex load-more-btn-wrap">
          <button className="btn btn-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};
