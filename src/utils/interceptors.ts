import type { AsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader } from './api';
import type { AppDispatch } from '../redux/store';

type RefreshUserThunk = AsyncThunk<
  { token: string }, 
  void, 
  {}
>;

type LogOutThunk = AsyncThunk<undefined, void, {}>;

export const setupInterceptors = (
  store: { dispatch: AppDispatch },
  refreshUserThunk: RefreshUserThunk,
  logOutThunk: LogOutThunk,
): void => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/login'
      ) {
        originalRequest._retry = true;
        try {
          const result = await store.dispatch(refreshUserThunk());

          if (result.meta.requestStatus === 'fulfilled') {
            const newToken = (result.payload as { token: string }).token;
            setAuthHeader(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (e) {
          store.dispatch(logOutThunk());
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    },
  );
};
