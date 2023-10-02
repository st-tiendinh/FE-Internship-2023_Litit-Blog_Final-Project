export const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_TYPE: 'token_type',
  ID_TOKEN: 'id_token',
  EXPIRES_IN: 'expires_in',
  USER_INFO: 'user_info',
  DRAFT_DATA: 'draft_data'
};

export const getLS = (key: string) => {
  // TODO: Optimize it
  return localStorage.getItem(key);
};

export const setLS = (key: string, value: any) => {
  if (key) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }
};

export const removeLS = (key: string) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
