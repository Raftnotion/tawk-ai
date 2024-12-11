import { AIContext, ChatCompletionRequestMessage } from './types';
import { OpenAIService } from './openai';
import { KnowledgeBaseService } from '../knowledge-base';

export class ContextManager {
  private openai: OpenAIService;
  private knowledgeBase: KnowledgeBaseService;
  private contexts: Map<string, AIContext> = new Map();

  constructor(openai: OpenAIService, knowledgeBase: KnowledgeBaseService) {
    this.openai = openai;
    this.knowledgeBase = knowledgeBase;
  }

  async getContext(chatId: string, knowledgeBaseId: string): Promise<AIContext> {
    let context = this.contexts.get(chatId);
    
    if (!context) {
      context = {
        messages: [],
        knowledgeBaseId,
        relevantQAs: [],
      };
      this.contexts.set(chatId, context);
    }

    return context;
  }

  async addMessage(
    chatId: string,
    message: ChatCompletionRequestMessage
  ): Promise<void> {
    const context = await this.getContext(chatId, '');
    context.messages.push(message);

    // Keep context window manageable
    if (context.messages.length > 10) {
      context.messages = context.messages.slice(-10);
    }

    // Update relevant QAs based on the new message
    if (message.role === 'user') {
      const embedding = await this.openai.generateEmbedding(message.content);
      context.relevantQAs = await this.knowledgeBase.findSimilarQAs(
        context.knowledgeBaseId,
        embedding,
        3
      );
    }
  }

  async clearContext(chatId: string): Promise<void> {
    this.contexts.delete(chatId);
  }
}