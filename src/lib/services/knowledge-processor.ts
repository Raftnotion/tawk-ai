import { type TawktoChat, type TawktoMessage } from '../api/tawkto';
import { type ProcessedQA } from './knowledge-base';
import { extractKeyPhrases } from '../utils/text-analysis';

interface ProcessingOptions {
  minQuestionLength: number;
  minAnswerLength: number;
  confidenceThreshold: number;
  maxContextSize: number;
}

const defaultOptions: ProcessingOptions = {
  minQuestionLength: 10,
  minAnswerLength: 20,
  confidenceThreshold: 0.6,
  maxContextSize: 3,
};

export class KnowledgeProcessor {
  private options: ProcessingOptions;

  constructor(options: Partial<ProcessingOptions> = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  async processChats(chats: TawktoChat[]): Promise<ProcessedQA[]> {
    const qaPairs: ProcessedQA[] = [];
    
    for (const chat of chats) {
      const contexts = this.extractChatContexts(chat.messages);
      
      for (const context of contexts) {
        const processed = await this.processContext(context);
        if (processed) {
          qaPairs.push(processed);
        }
      }
    }

    return this.deduplicateAndSort(qaPairs);
  }

  private extractChatContexts(messages: TawktoMessage[]): { 
    question: TawktoMessage[],
    answer: TawktoMessage[],
  }[] {
    const contexts: { question: TawktoMessage[], answer: TawktoMessage[] }[] = [];
    let currentContext = {
      question: [] as TawktoMessage[],
      answer: [] as TawktoMessage[],
    };

    for (const message of messages) {
      if (message.type === 'visitor') {
        if (currentContext.answer.length > 0) {
          contexts.push(currentContext);
          currentContext = {
            question: [],
            answer: [],
          };
        }
        if (currentContext.question.length < this.options.maxContextSize) {
          currentContext.question.push(message);
        }
      } else {
        if (currentContext.answer.length < this.options.maxContextSize) {
          currentContext.answer.push(message);
        }
      }
    }

    if (currentContext.question.length > 0 && currentContext.answer.length > 0) {
      contexts.push(currentContext);
    }

    return contexts;
  }

  private async processContext(context: {
    question: TawktoMessage[],
    answer: TawktoMessage[],
  }): Promise<ProcessedQA | null> {
    const question = this.combineMessages(context.question);
    const answer = this.combineMessages(context.answer);

    if (
      question.length < this.options.minQuestionLength ||
      answer.length < this.options.minAnswerLength
    ) {
      return null;
    }

    const confidence = this.calculateConfidence(context);
    if (confidence < this.options.confidenceThreshold) {
      return null;
    }

    const keywords = await extractKeyPhrases(question + " " + answer);

    return {
      question,
      answer,
      confidence,
      keywords,
    };
  }

  private combineMessages(messages: TawktoMessage[]): string {
    return messages
      .map(m => m.text)
      .join(' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  private calculateConfidence(context: {
    question: TawktoMessage[],
    answer: TawktoMessage[],
  }): number {
    let confidence = 1.0;

    // Reduce confidence based on context size
    if (context.question.length > 1) confidence *= 0.9;
    if (context.answer.length > 1) confidence *= 0.9;

    // Check message lengths
    const avgQuestionLength = this.averageLength(context.question);
    const avgAnswerLength = this.averageLength(context.answer);

    if (avgQuestionLength < 20) confidence *= 0.8;
    if (avgAnswerLength < 40) confidence *= 0.8;

    // Check for question indicators
    const hasQuestionMark = context.question.some(m => m.text.includes('?'));
    if (!hasQuestionMark) confidence *= 0.7;

    return Math.max(0, Math.min(1, confidence));
  }

  private averageLength(messages: TawktoMessage[]): number {
    return messages.reduce((sum, m) => sum + m.text.length, 0) / messages.length;
  }

  private deduplicateAndSort(qaPairs: ProcessedQA[]): ProcessedQA[] {
    // Remove duplicates based on similar questions
    const unique = qaPairs.reduce((acc, current) => {
      const isDuplicate = acc.some(item => 
        this.calculateSimilarity(item.question, current.question) > 0.8
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, [] as ProcessedQA[]);

    // Sort by confidence score
    return unique.sort((a, b) => b.confidence - a.confidence);
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }
}