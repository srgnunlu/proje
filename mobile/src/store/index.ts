import { configureStore } from '@reduxjs/toolkit';

import aiReducer from './aiSlice';
import feedReducer from './feedSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    ai: aiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
