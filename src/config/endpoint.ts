import { environment } from './environment';

const RESOURCES = {
  auth: {
    index: 'auth',
    users: 'users',
  },
  users: 'users',
  posts: environment.apiBaseUrl + 'posts',
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
  },
  posts: {
    index: `${RESOURCES.posts}`,
    public: `${RESOURCES.posts}/public`,
  },
};
