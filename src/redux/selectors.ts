import type { RootState } from './store';

export const selectIsLogged = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectRecommended = (state: RootState) => state.books.recommended;
export const selectTotalPages = (state: RootState) => state.books.totalPages;
export const selectOwnBooks = (state: RootState) => state.books.ownBooks;
export const selectIsLoading = (state: RootState) => state.books.isLoading;




