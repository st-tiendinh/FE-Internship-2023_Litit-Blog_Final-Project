import authRoutes from './core/auth/auth.routes';
import { PageRoute } from './core/modules/custom-router-dom/router.interface';
import { AuthStorageService } from './core/services/authStorage.service';
import pageRoutes from './pages/page.routes';

const authStorageServices = new AuthStorageService();

const useAuthRoute = authStorageServices.getToken() ? [] : authRoutes;

const appRoutes: PageRoute[] = [...pageRoutes, ...useAuthRoute];

export default appRoutes;
