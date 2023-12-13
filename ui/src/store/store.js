import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/core/api';

const initialState = {};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  preloadedState: initialState,
});