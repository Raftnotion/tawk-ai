import axios, { AxiosInstance } from 'axios';
import { CredentialManager } from '../services/credential-manager';
import { ErrorLogger } from '../services/error-logger';
import type { TawktoMessage, TawktoChat } from './tawkto-types';

export class TawktoClient {
  private api: AxiosInstance;
  private credentialManager: CredentialManager;
  private errorLogger: ErrorLogger;

  constructor() {
    this.credentialManager = CredentialManager.getInstance();
    this.errorLogger = new ErrorLogger();
    this.api = axios.create({
      baseURL: 'https://api.tawk.to/v3',
      timeout: 10000,
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use(async (config) => {
      const credentials = await this.credentialManager.getCredentials('tawkto');
      if (!credentials) {
        throw new Error('Tawk.to credentials not found');
      }

      config.headers.Authorization = `Bearer ${credentials.apiKey}`;
      return config;
    });
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    try {
      const credentials = await this.credentialManager.getCredentials('tawkto');
      if (!credentials) {
        throw new Error('Tawk.to credentials not found');
      }

      await this.api.post(`/chats/${chatId}/messages`, {
        text: message,
        type: 'agent',
      });
    } catch (error) {
      await this.errorLogger.logError('tawkto-client', error as Error, {
        method: 'sendMessage',
        chatId,
      });
      throw error;
    }
  }

  async getChat(chatId: string): Promise<TawktoChat> {
    try {
      const response = await this.api.get(`/chats/${chatId}`);
      return response.data;
    } catch (error) {
      await this.errorLogger.logError('tawkto-client', error as Error, {
        method: 'getChat',
        chatId,
      });
      throw error;
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      await this.api.get('/me');
      return true;
    } catch {
      return false;
    }
  }
}