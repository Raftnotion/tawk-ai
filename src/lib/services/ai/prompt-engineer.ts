import { AIAgentConfig, ChatCompletionRequestMessage, AIContext } from './types';

export class PromptEngineer {
  private config: AIAgentConfig;

  constructor(config: AIAgentConfig) {
    this.config = config;
  }

  generateSystemPrompt(): string {
    return `${this.config.systemPrompt}

Language: ${this.config.language}
Tone: ${this.config.tone}

Guidelines:
1. Provide accurate and helpful responses based on the knowledge base
2. Maintain a ${this.config.tone} tone throughout the conversation
3. If unsure, acknowledge limitations and provide the fallback message
4. Keep responses concise and focused
5. Use appropriate language and terminology for the context`;
  }

  generatePrompt(context: AIContext, userMessage: string): ChatCompletionRequestMessage[] {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: this.generateSystemPrompt(),
      },
    ];

    // Add relevant knowledge base entries as context
    if (context.relevantQAs.length > 0) {
      messages.push({
        role: 'system',
        content: 'Here are some relevant knowledge base entries:\n\n' +
          context.relevantQAs
            .map(qa => `Q: ${qa.question}\nA: ${qa.answer}`)
            .join('\n\n'),
      });
    }

    // Add conversation history
    messages.push(...context.messages);

    // Add the current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    return messages;
  }

  shouldUseFallback(response: string): boolean {
    const uncertaintyPhrases = [
      "I'm not sure",
      "I don't know",
      "I'm uncertain",
      "I can't help",
      "I don't have enough information",
    ];

    return uncertaintyPhrases.some(phrase => 
      response.toLowerCase().includes(phrase.toLowerCase())
    );
  }
}