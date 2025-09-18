import { createSlice } from '@reduxjs/toolkit';
import type { Book } from '../../types';
import { addBookfromRecommended, getOwnBooks, getRecommended } from './operations';

export interface BooksState {
  recommended: Book[];
  page: number;
  totalPages: number | null;
  ownBooks: Book[];
  isLoading: boolean;
}

const initialState: BooksState = {
  recommended: [],
  page: 1,
  totalPages: null,
  ownBooks: [],
  isLoading: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    prevPage(state) {
      state.page -= 1;
    },
    resetPage(state) {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecommended.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommended.fulfilled, (state, action) => {
        state.recommended = [...action.payload.results];
        state.totalPages = action.payload.totalPages || null;
        state.isLoading = false;
      })
      .addCase(getRecommended.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addBookfromRecommended.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookfromRecommended.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addBookfromRecommended.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOwnBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOwnBooks.fulfilled, (state, action) => {
        state.ownBooks = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getOwnBooks.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { nextPage, prevPage, resetPage } = booksSlice.actions;
export default booksSlice.reducer;
