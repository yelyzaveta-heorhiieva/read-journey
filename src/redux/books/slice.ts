import { createSlice } from '@reduxjs/toolkit';
import type { Book, Progress } from '../../types';
import { addBook, addBookfromRecommended, getOwnBooks, getRecommended, removeBook, startReading, stopReading } from './operations';

export interface BooksState {
  recommended: Book[];
  totalPages: number | null;
  ownBooks: Book[];
  isLoading: boolean;
  progress: Progress[];
}

const initialState: BooksState = {
  recommended: [],
  totalPages: null,
  ownBooks: [],
  isLoading: false,
  progress: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
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
      .addCase(addBookfromRecommended.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = [...state.ownBooks, action.payload];
      })
      .addCase(addBookfromRecommended.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = [...state.ownBooks, action.payload];
      })
      .addCase(addBook.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = state.ownBooks.filter(
          (item) => item._id !== action.payload.id,
        );
      })
      .addCase(removeBook.rejected, (state) => {
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
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.progress = [...action.payload.progress];
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.progress = [...action.payload.progress];
      })
  },
});


export default booksSlice.reducer;
