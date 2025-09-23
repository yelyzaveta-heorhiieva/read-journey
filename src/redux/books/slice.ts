import { createSlice } from '@reduxjs/toolkit';
import type { Book, Progress, RecommendedBook } from '../../types';
import {
  addBook,
  addBookfromRecommended,
  deleteProgress,
  getBook,
  getOwnBooks,
  getRecommended,
  removeBook,
  startReading,
  stopReading,
} from './operations';

export interface BooksState {
  recommended: RecommendedBook[];
  totalPages: number | null;
  ownBooks: Book[];
  isLoading: boolean;
  book: Book | null;
  currentPage: number;
}

const initialState: BooksState = {
  recommended: [],
  totalPages: null,
  ownBooks: [],
  isLoading: false,
  book: null,
  currentPage: 0,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
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
      .addCase(startReading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.currentPage =
          action.payload.progress[
            action.payload.progress.length - 1
          ]?.startPage;
        state.book = action.payload;
        state.isLoading = false;
      })
      .addCase(startReading.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(stopReading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
        state.currentPage =
          action.payload.progress[
            action.payload.progress.length - 1
          ]?.finishPage;
      })
      .addCase(stopReading.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.book = action.payload;
        state.currentPage =
          action.payload.progress[action.payload.progress.length - 1]
            ?.finishPage ||
          action.payload.progress[action.payload.progress.length - 1]
            ?.startPage ||
          0;
      })
      .addCase(deleteProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
        state.currentPage =
          action.payload.progress[action.payload.progress.length - 1]
            ?.finishPage || 0;
      })
      .addCase(deleteProgress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default booksSlice.reducer;
