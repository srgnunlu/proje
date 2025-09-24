export interface FeedItem {
  id: string;
  title: string;
  summary: string;
  body: string;
  image?: string;
}

export interface FeedState {
  cards: FeedItem[];
  currentIndex: number;
}

export interface AiResponse {
  cardId: string;
  question: string;
  answer: string;
  model: string;
  createdAt: string;
}
