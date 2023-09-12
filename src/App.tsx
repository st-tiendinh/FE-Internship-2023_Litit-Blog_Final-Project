import { BrowserRouter } from 'react-router-dom';

import { RouterOutlet } from './app/core/modules/custom-router-dom';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';
import PostList from './app/shared/components/PostList';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <PostList/> 
        <AppSuspense fallback={<></>}>
          <RouterOutlet routes={appRoutes} />
        </AppSuspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
