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
  },
  users: {
    index: `${RESOURCES.users}`,
  },
  posts: {
    public: `${RESOURCES.posts}/public`,
  },
};
