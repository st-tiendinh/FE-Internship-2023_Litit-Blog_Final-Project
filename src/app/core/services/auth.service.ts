import AuthHelper from '../helpers/authHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from './api.service';

export class AuthService extends AuthHelper {
  http = new ApiService();

  constructor() {
    super();
  }

  async signIn(body: any) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.login], body);
  }

  signOut() {
    this.removeToken();
  }
}
