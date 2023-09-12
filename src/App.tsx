<<<<<<< HEAD
function App() {
  return <div className="app"></div>;
=======
import { BrowserRouter } from 'react-router-dom';

import { RouterOutlet } from './app/core/modules/custom-router-dom';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppSuspense fallback={<></>}>
          <RouterOutlet routes={appRoutes} />
        </AppSuspense>
      </div>
    </BrowserRouter>
  );
>>>>>>> b37dd3da10dd25b8c57a76f4d358a643461a732d
}

export default App;
