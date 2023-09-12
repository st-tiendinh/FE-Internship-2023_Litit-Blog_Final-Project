import { environment } from './environment';

const RESOURCES = {
  auth: 'auth',
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
