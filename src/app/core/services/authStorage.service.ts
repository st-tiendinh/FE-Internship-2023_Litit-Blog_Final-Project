export interface AuthStorage {
  setToken(data?: any): void;
  getToken(): void;
  removeToken(): void;
}

export class AuthStorageService implements AuthStorage {
  ACCESS_TOKEN = 'token';

  setToken(token?: any) {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN, token);
    }
  }

  getToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }
}
