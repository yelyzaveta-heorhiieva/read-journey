import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import type { FetchRecomended } from '../../types';

export const getRecommended = createAsyncThunk(
  'books/recommended',
  async (params: FetchRecomended, thunkAPI) => {
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
      toast.success('Book is succesfully added to your library');
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
