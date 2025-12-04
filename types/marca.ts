
export enum FeedbackType {
  RECOGNITION = 'Reconhecimento',
  ALIGNMENT = 'Alinhamento',
}

export interface FeedbackData {
  id: string;
  type: FeedbackType;
  moment: string;
  action: string;
  reaction: string;
  consequence: string;
  alternative: string;
  createdAt: Date;
}

export enum MarcaField {
  MOMENT = 'moment',
  ACTION = 'action',
  REACTION = 'reaction',
  CONSEQUENCE = 'consequence',
  ALTERNATIVE = 'alternative',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isDraft?: boolean; 
}

export interface CoachResponse {
  message: string; 
  draft: string | null; 
}

