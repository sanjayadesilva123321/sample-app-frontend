import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './helpers/routes';

import { AuthProvider } from './containers/auth/AuthProvider';
import AuthenticatedWrapper from './containers/auth/authenticationWrappers/Authenticated';
import UnAuthenticatedWrapper from './containers/auth/authenticationWrappers/UnAuthenticated';

import ToastAlerts from './components/commmon/toastAlerts/ToastAlerts';
import Loading from './components/commmon/loading/Loading';
import Layout from './components/commmon/layout/Layout';

const Register = React.lazy(() => import('./containers/auth/register/Register'));
const Login = React.lazy(() => import('./containers/auth/login/Login'));
const Home = React.lazy(() => import('./containers/home/Home'));
const Editor = React.lazy(() => import('./containers/editor/Editor'));
const Unauthorized = React.lazy(() => import('./components/auth/unauthorized/Unauthorized'));
const NotFoundPage = React.lazy(() => import('./components/auth/notFoundPage/NotFoundPage'));

function App() {
  return (
    <div data-testid="app-1">
      <AuthProvider>
        {/* public routes */}
        <UnAuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={routes.UN_AUTHENTICATED.LOGIN.PATH} element={<Login />} />
              <Route path={routes.UN_AUTHENTICATED.REGISTER.PATH} element={<Register />} />
              <Route path={routes.ROOT.PATH} element={<Login />} />
              <Route path={routes.ALL.PATH} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </UnAuthenticatedWrapper>

        {/* we want to protect these routes */}
        <AuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={routes.ROOT.PATH} element={<Layout />}>
                <Route path={routes.ROOT.PATH} element={<Home />} />
                <Route path={routes.AUTHENTICATED.EDITOR.PATH} element={<Editor />} />
                <Route path={routes.AUTHENTICATED.UNAUTHORIZED.PATH} element={<Unauthorized />} />
              </Route>
              <Route path={routes.ALL.PATH} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AuthenticatedWrapper>
        <ToastAlerts />
      </AuthProvider>
    </div>
  );
}

export default App;
