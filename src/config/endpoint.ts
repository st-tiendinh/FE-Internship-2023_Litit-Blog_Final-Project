import { environment } from './environment';

const RESOURCES = {
  auth: {
    index: 'auth',
    users: 'users',
  },
  users: 'users',
  posts: environment.apiBaseUrl + 'posts',
  signatures: environment.apiBaseUrl + 'signatures',
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
    changePassword: `${RESOURCES.users}/change-password`,
  },
  posts: {
    index: `${RESOURCES.posts}`,
    public: `${RESOURCES.posts}/public`,
    recommend: `${RESOURCES.posts}/recommend`,
    recyclebin: `${RESOURCES.posts}/recyclebin`,
  },
  signatures: {
    index: `${RESOURCES.signatures}`,
  },
};
