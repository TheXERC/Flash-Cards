export interface FlashCard {
  question: string;
  answer: string;
}

export interface FlashCardSet {
  filename: string;
  cards: FlashCard[];
}

export type Direction = 'ltr' | 'rtl';
