import { BrowserRouter } from 'react-router-dom';

import './stylesheet/style.scss';
import { RouterOutlet } from './app/core/modules/custom-router-dom';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';
import Home from './app/pages/home';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Home/>
        <AppSuspense fallback={<></>}>
          <RouterOutlet routes={appRoutes} />
        </AppSuspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
