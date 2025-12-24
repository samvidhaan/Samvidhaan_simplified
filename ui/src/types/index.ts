export type Page =
  | 'home'
  | 'quiz'
  | 'chat'
  | 'about'
  | 'history'
  | 'rights'
  | 'need';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
