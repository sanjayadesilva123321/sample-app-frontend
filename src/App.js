import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ToastAlerts from "./components/commmon/toastAlerts/ToastAlerts";
import { AuthProvider } from "./containers/auth/AuthProvider";
import Layout from "./components/commmon/layout/Layout";
import Loading from "./components/commmon/loading/Loading";
import AuthenticatedWrapper from "./containers/auth/authenticationWrappers/Authenticated";
import UnAuthenticatedWrapper from "./containers/auth/authenticationWrappers/UnAuthenticated";

const Register = React.lazy(() =>
  import("./containers/auth/register/Register")
);
const Login = React.lazy(() => import("./containers/auth/login/Login"));
const Home = React.lazy(() => import("./containers/home/Home"));
const Editor = React.lazy(() => import("./containers/editor/Editor"));
const Unauthorized = React.lazy(() =>
  import("./components/auth/unauthroized/Unauthorized")
);
const NotFoundPage = React.lazy(() =>
    import("./components/auth/notFoundPage/NotFoundPage")
);

function App() {
  return (
    <div data-testid="app-1">
      <AuthProvider>
        {/* public routes */}
        <UnAuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </UnAuthenticatedWrapper>

        {/* we want to protect these routes */}
        <AuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="editor" element={<Editor />} />
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AuthenticatedWrapper>
        <ToastAlerts />
      </AuthProvider>
    </div>
  );
}

export default App;
