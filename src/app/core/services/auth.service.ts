import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

import AuthHelper from '../helpers/authHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from './api.service';
import { KEYS } from '../helpers/storageHelper';
import JwtHelper from '../helpers/jwtHelper';

export class AuthService extends AuthHelper {
  http = new ApiService();
  jwt = new JwtHelper();

  constructor() {
    super();
  }

  async signIn(body: any) {
    const response: any = await this.http.post([ENDPOINT.auth.login], body);
    if (response && response.accessToken) {
      const token = response.accessToken;
      const decodeToken: any = jwt(token);

      Cookies.set(KEYS.ACCESS_TOKEN, response.accessToken, {
        expires: (decodeToken.exp - decodeToken.iat) / 86400,
      });
    }
    return response;
  }

  async signOut() {
    this.http.setHeaders(this.jwt.getAuthHeader());
    const response: any = await this.http.post([ENDPOINT.auth.logout]);
    Cookies.remove(KEYS.ACCESS_TOKEN);
    return response;
  }

  async updateUser(body: any) {
    this.http.setHeaders(this.jwt.getAuthHeader());
    const response: any = await this.http.put([ENDPOINT.users.me], body);
    return response;
  }
}
