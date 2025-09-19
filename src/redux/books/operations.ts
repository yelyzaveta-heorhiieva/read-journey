import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import type { FetchRecommended, FiltersValues, ReadingCredentials } from '../../types';

export const getRecommended = createAsyncThunk(
  'books/recommended',
  async (params: FetchRecommended, thunkAPI) => {
    const searchParams = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [
        string,
        string,
      ][],
    );

    try {
      const { data } = await api.get(
        `/books/recommend?${searchParams}`,
      );
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addBookfromRecommended = createAsyncThunk(
  'books/addBookFromrecommended',
  async (id: string, thunkAPI) => {
    try {
        const { data } = await api.post(`/books/add/${id}`);
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (credentials: FiltersValues, thunkAPI) => {
    try {
      const { data } = await api.post('/books/add/', credentials);
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const removeBook = createAsyncThunk(
  'books/removeBook',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.delete(`/books/remove/${id}`);
      toast.success('Book is succesfully removed from your library');
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const getOwnBooks = createAsyncThunk(
  'books/getOwn',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/books/own');
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const startReading = createAsyncThunk(
  'books/startReading',
  async (credentials: ReadingCredentials, thunkAPI) => {
    try {
      const { data } = await api.post('/books/reading/start', credentials);
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const stopReading = createAsyncThunk(
  'books/stopReading',
  async (credentials: ReadingCredentials, thunkAPI) => {
    try {
      const { data } = await api.post('/books/reading/finish', credentials);
      return data;
    } catch (e: any) {
      toast.error(JSON.parse(e.request.response).message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);