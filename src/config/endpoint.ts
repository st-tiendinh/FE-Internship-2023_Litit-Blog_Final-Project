import { environment } from './environment';

const RESOURCES = {
  auth: {
    index: 'auth',
    users: 'users',
  },
  users: 'users',
  posts: environment.apiBaseUrl + 'posts',
  bookmarks: environment.apiBaseUrl + 'bookmarks',
  signatures: environment.apiBaseUrl + 'signatures',
  friends: environment.apiBaseUrl + 'friends',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth.users}`,
    login: `${RESOURCES.auth.users}/login`,
    logout: `${RESOURCES.auth.users}/logout`,
    register: `${RESOURCES.auth.users}/register`,
  },
  users: {
    index: `${RESOURCES.users}`,
    me: `${RESOURCES.users}/me`,
    changePassword: `${RESOURCES.users}/change-password`,
  },
  posts: {
    index: `${RESOURCES.posts}`,
    public: `${RESOURCES.posts}/public`,
    recommend: `${RESOURCES.posts}/recommend`,
    recyclebin: `${RESOURCES.posts}/recyclebin`,
    draft: `${RESOURCES.posts}/draft`,
  },
  signatures: {
    index: `${RESOURCES.signatures}`,
  },
  bookmarks: {
    index: `${RESOURCES.bookmarks}`,
  },
  friends: {
    index: `${RESOURCES.friends}`,
    followers: `${RESOURCES.friends}/me/followers`,
    followings: `${RESOURCES.friends}/me/followings`,
    follow: `${RESOURCES.friends}/follow`,
  },
};
