export interface FlashCard {
  question: string;
  answer: string;
}

export interface FlashCardSet {
  filename: string;
  cards: FlashCard[];
}

export interface CardReviewState {
  index: number;
  marked: boolean;
  correct: boolean | null;
}

export type Direction = 'ltr' | 'rtl';
