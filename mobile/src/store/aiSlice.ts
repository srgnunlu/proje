import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import aiClient from '@services/aiClient';
import { buildQuestionPrompt } from '@utils/promptBuilder';
import type { FeedItem, AiResponse } from '@models/feed';

export interface AskQuestionArgs {
  card: FeedItem;
  question: string;
  model?: string;
}

interface AiState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  responses: Record<string, AiResponse>;
  error?: string;
  activeCardId?: string;
}

const initialState: AiState = {
  status: 'idle',
  responses: {}
};

export const askQuestion = createAsyncThunk<AiResponse, AskQuestionArgs>(
  'ai/askQuestion',
  async ({ card, question, model }, { signal }) => {
    const prompt = buildQuestionPrompt(card, question);
    const answer = await aiClient.ask({ prompt, model, signal });

    return {
      cardId: card.id,
      question,
      answer,
      model: model ?? aiClient.defaultModel,
      createdAt: new Date().toISOString()
    };
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    resetAiState(state) {
      state.status = 'idle';
      state.error = undefined;
      state.activeCardId = undefined;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(askQuestion.pending, (state, action) => {
        state.status = 'loading';
        state.error = undefined;
        state.activeCardId = action.meta.arg.card.id;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.activeCardId = action.payload.cardId;
        state.responses[action.payload.cardId] = action.payload;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetAiState } = aiSlice.actions;
export default aiSlice.reducer;
