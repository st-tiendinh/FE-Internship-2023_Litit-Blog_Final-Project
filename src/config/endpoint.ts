import { environment } from './environment';

const RESOURCES = {
  auth: 'users',
  users: environment.apiUserUrl,
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`,
  },
  users: {
    index: `${RESOURCES.users}`,
  },
};
