const RESOURCES = {
  auth: {
    index: 'auth',
    users: 'users',
  },
  users: 'users',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth.users}`,
    login: `${RESOURCES.auth.users}/login`,
  },
  users: {
    index: `${RESOURCES.users}`,
  },
};
