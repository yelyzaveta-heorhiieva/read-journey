import { createSlice, isAnyOf} from '@reduxjs/toolkit';
import type { Book, RecommendedBook } from '../../types';
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
import { logOut } from '../auth/operations';

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

const setLoading = (state: BooksState) => {
  state.isLoading = true;
};

const clearLoading = (state: BooksState) => {
  state.isLoading = false;
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommended.fulfilled, (state, action) => {
        state.recommended = [...action.payload.results];
        state.totalPages = action.payload.totalPages || null;
        state.isLoading = false;
      })
      .addCase(addBookfromRecommended.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks.push(action.payload);
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks.push(action.payload);
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = state.ownBooks.filter(
          (item) => item._id !== action.payload.id,
        );
      })
      .addCase(getOwnBooks.fulfilled, (state, action) => {
        state.ownBooks = [...action.payload];
        state.isLoading = false;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.currentPage =
          action.payload.progress[
            action.payload.progress.length - 1
          ]?.startPage;
        state.book = action.payload;
        state.isLoading = false;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
        state.currentPage =
          action.payload.progress[
            action.payload.progress.length - 1
          ]?.finishPage;
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
      .addCase(deleteProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
        state.currentPage =
          action.payload.progress[action.payload.progress.length - 1]
            ?.finishPage || 0;
      })
      .addMatcher(
        isAnyOf(
          getRecommended.pending,
          addBookfromRecommended.pending,
          addBook.pending,
          removeBook.pending,
          getOwnBooks.pending,
          startReading.pending,
          stopReading.pending,
          deleteProgress.pending,
        ),
        setLoading,
      )
      .addMatcher(
        isAnyOf(
          getRecommended.rejected,
          addBookfromRecommended.rejected,
          addBook.rejected,
          removeBook.rejected,
          getOwnBooks.rejected,
          startReading.rejected,
          stopReading.rejected,
          deleteProgress.rejected,
        ),
        clearLoading,
      );
  },
});

export default booksSlice.reducer;
