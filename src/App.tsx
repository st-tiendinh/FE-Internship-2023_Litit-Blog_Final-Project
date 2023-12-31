import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import './stylesheet/style.scss';
import { RouterOutlet } from './app/core/modules/custom-router-dom';
import history from './app/core/modules/custom-router-dom/history';
import appRoutes from './app/app.route';
import AppSuspense from './AppSuspense';
import appReducer from './app/app.reducers';
import appMiddleware from './app/app.middleware';

import { Header, Footer, Modal, Spinner } from './app/shared/components';
import { Toast } from './app/shared/components/Toast';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="app">
          <AppSuspense fallback={<></>}>
            <Header />
          </AppSuspense>
          <AppSuspense
            fallback={
              <div className="loading-page">
                <Spinner />
              </div>
            }
          >
            <Modal />
            <Toast />
            <RouterOutlet routes={appRoutes} />
          </AppSuspense>
          <AppSuspense fallback={<></>}>
            <Footer />
          </AppSuspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
