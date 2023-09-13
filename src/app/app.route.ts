import authRoutes from './core/auth/auth.routes';
import { PageRoute } from './core/modules/custom-router-dom/router.interface';
import pageRoutes from './pages/page.routes';

const appRoutes: PageRoute[] = [...authRoutes, ...pageRoutes];

export default appRoutes;
