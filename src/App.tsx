import { lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import NotFoundPage from "./pages/NotFoundPage";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const RegistrationPage = lazy(() => import('./pages/RegistrationPage'))
  const LoginPage = lazy(() => import('./pages/LoginPage'));
  const MainLayoutPage = lazy(() => import('./pages/MainLayoutPage'));


  return (
    <>
      <Layout>
        <Routes>
          <Route
            path='/register'
            element={
              <RestrictedRoute
                redirectTo='/'
                component={<RegistrationPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/login'
            element={
              <RestrictedRoute
                redirectTo='/'
                component={<LoginPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute
                redirectTo='/login'
                component={<MainLayoutPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App
