import AuthHelper from '../helpers/authHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from './api.service';
import Cookies from 'js-cookie';
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
      Cookies.set(KEYS.ACCESS_TOKEN, response.accessToken, { expires: 1 });
    }
    return response;
  }

  async signOut() {
    this.http.setHeaders(this.jwt.getAuthHeader());
    const response: any = await this.http.post([ENDPOINT.auth.logout]);
    Cookies.remove(KEYS.ACCESS_TOKEN);
    return response;
  }
}
