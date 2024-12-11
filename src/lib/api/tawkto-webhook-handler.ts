import { TawktoWebhookEvent, TawktoMessage, TawktoChat } from './tawkto-types';
import { AIAgentService } from '../services/ai/agent-service';
import { AgentMonitor } from '../services/ai/agent-monitor';
import { ErrorLogger } from '../services/error-logger';

export class TawktoWebhookHandler {
  private aiAgent: AIAgentService;
  private monitor: AgentMonitor;
  private errorLogger: ErrorLogger;
  private retryAttempts = 3;
  private retryDelay = 1000; // ms

  constructor(aiAgent: AIAgentService) {
    this.aiAgent = aiAgent;
    this.monitor = AgentMonitor.getInstance();
    this.errorLogger = new ErrorLogger();
  }

  async handleWebhook(event: TawktoWebhookEvent): Promise<void> {
    try {
      switch (event.type) {
        case 'message':
          await this.handleMessage(event);
          break;
        case 'conversation_start':
          await this.handleConversationStart(event);
          break;
        case 'conversation_end':
          await this.handleConversationEnd(event);
          break;
        default:
          throw new Error(`Unsupported event type: ${event.type}`);
      }
    } catch (error) {
      await this.errorLogger.logError('webhook-handler', error);
      throw error;
    }
  }

  private async handleMessage(event: TawktoWebhookEvent): Promise<void> {
    const { chatId, message } = event.data;
    
    if (message.type !== 'visitor') {
      return; // Only process visitor messages
    }

    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < this.retryAttempts) {
      try {
        const response = await this.aiAgent.processMessage(chatId, message.text);
        await this.sendResponse(chatId, response);
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        attempt++;
        
        if (attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
        }
      }
    }

    // All retries failed
    await this.handleFailure(chatId, lastError);
  }

  private async handleConversationStart(event: TawktoWebhookEvent): Promise<void> {
    const { chatId } = event.data;
    await this.aiAgent.resetChat(chatId);
  }

  private async handleConversationEnd(event: TawktoWebhookEvent): Promise<void> {
    const { chatId } = event.data;
    await this.aiAgent.resetChat(chatId);
  }

  private async sendResponse(chatId: string, message: string): Promise<void> {
    // TODO: Implement actual Tawk.to API call to send message
    console.log('Sending response:', { chatId, message });
  }

  private async handleFailure(chatId: string, error: Error | null): Promise<void> {
    await this.errorLogger.logError('message-processing', error);
    
    // Send fallback message to user
    const fallbackMessage = "I apologize, but I'm having trouble processing your request. Please try again later or contact our support team.";
    await this.sendResponse(chatId, fallbackMessage);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}