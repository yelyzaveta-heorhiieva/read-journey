import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import NotFoundPage from './pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './redux/store';
import { selectIsLogged, selectIsRefreshing } from './redux/selectors';
import { getCurrentUser, refreshToken } from './redux/auth/operations';
import RecomendedPage from './pages/RecommendedPage';
import LibraryPage from './pages/LibraryPage';
import ReadingPage from './pages/ReadingPage';
import Loader from './components/Loader';
import './App.css'

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLogged);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(getCurrentUser());
      if (
        getCurrentUser.rejected.match(result) &&
        result.payload === 'Request failed with status code 401'
      ) {
        const refreshResult = await dispatch(refreshToken());
        if (refreshToken.fulfilled.match(refreshResult)) {
          dispatch(getCurrentUser());
        }
      }
    };

    if (isLoggedIn) fetchUser();
  }, [dispatch, isLoggedIn]);

  const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
  const LoginPage = lazy(() => import('./pages/LoginPage'));
  const MainLayoutPage = lazy(() => import('./pages/MainLayoutPage'));

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Routes>
        <Route
          path='/register'
          element={
            <RestrictedRoute
              redirectTo='/recommended'
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path='/login'
          element={
            <RestrictedRoute
              redirectTo='/recommended'
              component={<LoginPage />}
            />
          }
        />
        <Route
          path='/'
          element={
            <PrivateRoute redirectTo='/login' component={<MainLayoutPage />} />
          }
        >
          <Route path='recommended' element={<RecomendedPage />} />
          <Route path='library' element={<LibraryPage />}></Route>
          <Route path='reading/:bookId' element={<ReadingPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
