export interface KnowledgeBase {
  id: string;
  userId: string;
  name: string;
  description: string;
  source: 'tawkto' | 'scraper' | 'upload';
  status: 'processing' | 'ready' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAgent {
  id: string;
  userId: string;
  knowledgeBaseId: string;
  name: string;
  description: string;
  language: string;
  tone: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
  currency: string;
}