import { OpenAIService } from './openai';
import { ContextManager } from './context-manager';
import { PromptEngineer } from './prompt-engineer';
import type { AIAgentConfig } from './types';
import { AgentMonitor } from './agent-monitor';

export class AIAgentService {
  private openai: OpenAIService;
  private contextManager: ContextManager;
  private promptEngineer: PromptEngineer;
  private monitor: AgentMonitor;
  private config: AIAgentConfig;

  constructor(
    openai: OpenAIService,
    contextManager: ContextManager,
    config: AIAgentConfig
  ) {
    this.openai = openai;
    this.contextManager = contextManager;
    this.promptEngineer = new PromptEngineer(config);
    this.monitor = AgentMonitor.getInstance();
    this.config = config;
  }

  async processMessage(chatId: string, message: string): Promise<string> {
    const startTime = Date.now();

    try {
      // Get or create context for this chat
      const context = await this.contextManager.getContext(chatId, '');

      // Add user message to context
      await this.contextManager.addMessage(chatId, {
        role: 'user',
        content: message,
      });

      // Generate prompt with context
      const prompt = this.promptEngineer.generatePrompt(context, message);

      // Get AI response
      const response = await this.openai.generateResponse(
        prompt,
        this.config.temperature
      );

      // Check if we should use fallback
      if (this.promptEngineer.shouldUseFallback(response)) {
        return this.config.fallbackMessage;
      }

      // Add AI response to context
      await this.contextManager.addMessage(chatId, {
        role: 'assistant',
        content: response,
      });

      // Update metrics
      this.monitor.updateMetrics(chatId, {
        responseTime: Date.now() - startTime,
        success: true,
      });

      return response;
    } catch (error) {
      // Update metrics on failure
      this.monitor.updateMetrics(chatId, {
        responseTime: Date.now() - startTime,
        success: false,
      });

      throw error;
    }
  }

  async resetChat(chatId: string): Promise<void> {
    await this.contextManager.clearContext(chatId);
  }
}