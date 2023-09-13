import { environment } from './environment';

const RESOURCES = {
  auth: 'auth',
  users: environment.apiUserUrl,
  posts: environment.apiBaseUrl + 'posts',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`,
  },
  users: {
    index: `${RESOURCES.users}`,
  },
  posts: {
    public: `${RESOURCES.posts}/public`,
  },
};
