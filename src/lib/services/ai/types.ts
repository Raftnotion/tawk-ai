export interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface AIContext {
  messages: ChatCompletionRequestMessage[];
  knowledgeBaseId: string;
  relevantQAs: {
    question: string;
    answer: string;
    similarity: number;
  }[];
}

export interface AIAgentConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  language: string;
  tone: string;
  fallbackMessage: string;
}