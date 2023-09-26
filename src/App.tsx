import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import './stylesheet/style.scss';
import { RouterOutlet } from './app/core/modules/custom-router-dom';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';
import appReducer from './app/app.reducers';
import appMiddleware from './app/app.middleware';

import { Header, Footer, Modal } from './app/shared/components';
import { Toast } from './app/shared/components/Toast';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <AppSuspense fallback={<></>}>
            <Modal />
            <Toast />
            <Header />
            <RouterOutlet routes={appRoutes} />
            <Footer />
          </AppSuspense>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
