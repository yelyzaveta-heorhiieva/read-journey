
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import type { AuthFormValues } from '../../types';
import type { RootState } from '../store';
import { api, clearAuthHeader, setAuthHeader } from '../../utils/api';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: AuthFormValues, thunkAPI) => {
    try {
      const response = await api.post('/users/signup', credentials);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: AuthFormValues, thunkAPI) => {
    try {
      const response = await api.post('/users/signin', credentials);
      setAuthHeader(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/signout');
    localStorage.removeItem('refreshToken');
    clearAuthHeader();
  } catch (e: any) {
    toast.error(JSON.parse(e.request.response).message);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No access token');
    }

    try {
      setAuthHeader(token);
      const response = await api.get('/users/current');
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      return thunkAPI.rejectWithValue('No refresh token');
    }

    try {
      setAuthHeader(storedRefreshToken);
      const response = await api.get('/users/current/refresh');
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (e: any) {
      toast.error('Refresh failed');
       localStorage.removeItem('refreshToken')
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
