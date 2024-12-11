import { type TawktoChat, type TawktoMessage } from '../api/tawkto';
import { type ProcessedQA } from '../services/knowledge-base';
import { extractKeyPhrases } from './text-analysis';

interface ChatContext {
  visitorMessages: TawktoMessage[];
  agentResponses: TawktoMessage[];
}

export async function processChatsToQA(chats: TawktoChat[]): Promise<ProcessedQA[]> {
  const qaPairs: ProcessedQA[] = [];
  
  for (const chat of chats) {
    const contexts = extractChatContexts(chat.messages);
    
    for (const context of contexts) {
      if (context.visitorMessages.length === 0 || context.agentResponses.length === 0) {
        continue;
      }

      const question = combineMessages(context.visitorMessages);
      const answer = combineMessages(context.agentResponses);
      
      // Skip if question or answer is too short
      if (question.length < 10 || answer.length < 20) {
        continue;
      }

      const keywords = await extractKeyPhrases(question + " " + answer);
      const confidence = calculateConfidence(context);

      qaPairs.push({
        question,
        answer,
        confidence,
        keywords,
      });
    }
  }

  // Sort by confidence and remove duplicates
  return deduplicateAndSort(qaPairs);
}

function extractChatContexts(messages: TawktoMessage[]): ChatContext[] {
  const contexts: ChatContext[] = [];
  let currentContext: ChatContext = {
    visitorMessages: [],
    agentResponses: [],
  };

  for (const message of messages) {
    if (message.type === 'visitor') {
      // If we have agent responses and get a new visitor message,
      // start a new context
      if (currentContext.agentResponses.length > 0) {
        contexts.push(currentContext);
        currentContext = {
          visitorMessages: [],
          agentResponses: [],
        };
      }
      currentContext.visitorMessages.push(message);
    } else {
      currentContext.agentResponses.push(message);
    }
  }

  // Add the last context if it has both visitor and agent messages
  if (currentContext.visitorMessages.length > 0 && currentContext.agentResponses.length > 0) {
    contexts.push(currentContext);
  }

  return contexts;
}

function combineMessages(messages: TawktoMessage[]): string {
  return messages
    .map(m => m.text)
    .join(' ')
    .trim();
}

function calculateConfidence(context: ChatContext): number {
  let confidence = 1.0;

  // Reduce confidence if there are too many messages in the context
  if (context.visitorMessages.length > 2) {
    confidence *= 0.9;
  }
  if (context.agentResponses.length > 2) {
    confidence *= 0.9;
  }

  // Reduce confidence if messages are too short
  const avgVisitorLength = average(context.visitorMessages.map(m => m.text.length));
  const avgAgentLength = average(context.agentResponses.map(m => m.text.length));
  
  if (avgVisitorLength < 20) confidence *= 0.8;
  if (avgAgentLength < 40) confidence *= 0.8;

  return Math.max(0.1, confidence);
}

function average(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function deduplicateAndSort(qaPairs: ProcessedQA[]): ProcessedQA[] {
  // Remove duplicates based on similar questions
  const unique = qaPairs.reduce((acc, current) => {
    const isDuplicate = acc.some(item => 
      calculateSimilarity(item.question, current.question) > 0.8
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, [] as ProcessedQA[]);

  // Sort by confidence
  return unique.sort((a, b) => b.confidence - a.confidence);
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.toLowerCase().split(/\s+/));
  const words2 = new Set(str2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}