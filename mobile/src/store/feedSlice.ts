import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import feedData from '@data/mockFeed.json';
import type { FeedState } from '@models/feed';

const initialState: FeedState = {
  cards: feedData,
  currentIndex: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  }
});

export const { setCurrentIndex } = feedSlice.actions;
export default feedSlice.reducer;
