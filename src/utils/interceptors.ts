import type { Action, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api, setAuthHeader } from './api';
import type { AppDispatch } from '../redux/store';
import type { AxiosRequestConfig } from 'axios';

type RefreshUserThunk = AsyncThunk<{ token: string }, void, {}>;
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export const setupInterceptors = (
  store: { dispatch: AppDispatch },
  refreshUserThunk: RefreshUserThunk,
  clearUser: () => PayloadAction<void>,
): void => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/users/signin' &&
        originalRequest.url !== '/users/current/refresh'
      ) {
        originalRequest._retry = true;
        try {
          const result = await store.dispatch(refreshUserThunk());

          if (result.meta.requestStatus === 'fulfilled') {
            const newToken = (result.payload as { token: string }).token;
            setAuthHeader(newToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return api(originalRequest);
          } else {
            store.dispatch(clearUser());
          }
        } catch (e) {
          store.dispatch(clearUser());
          return Promise.reject(e);
        }
      } else {
        store.dispatch(clearUser());
      }

      return Promise.reject(error);
    },
  );
};
