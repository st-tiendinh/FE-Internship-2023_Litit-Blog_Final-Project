import authRoutes from './core/auth/auth.routes';
import { PageRoute } from './core/modules/custom-router-dom/router.interface';

const appRoutes: PageRoute[] = [...authRoutes];

export default appRoutes;
