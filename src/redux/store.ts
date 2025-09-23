import { combineReducers, configureStore, type Reducer } from '@reduxjs/toolkit';
import authReducer, { type AuthState } from './auth/slice'
import booksReducer from './books/slice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupInterceptors } from '../utils/interceptors';
import { logOut, refreshToken } from './auth/operations';


const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn'],
};

const persistedAuthReducer = persistReducer<AuthState>(
  authPersistConfig,
  authReducer,
);

  const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    books: booksReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupInterceptors(store, refreshToken, logOut);