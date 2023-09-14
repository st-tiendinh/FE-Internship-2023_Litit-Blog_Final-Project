import { BrowserRouter } from 'react-router-dom';

import './stylesheet/style.scss';
import { RouterOutlet } from './app/core/modules/custom-router-dom';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';
import { Header, Footer } from './app/shared/components';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppSuspense fallback={<></>}>
          <Header />
        </AppSuspense>
        <AppSuspense fallback={<></>}>
          <RouterOutlet routes={appRoutes} />
        </AppSuspense>
        <AppSuspense fallback={<></>}>
          <Footer />
        </AppSuspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
