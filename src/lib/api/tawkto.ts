import axios from 'axios';

const TAWKTO_API_BASE = 'https://api.tawk.to/v3';

export interface TawktoCredentials {
  apiKey: string;
  email: string;
}

export interface TawktoChat {
  id: string;
  subject: string;
  messages: TawktoMessage[];
  createdAt: string;
}

export interface TawktoMessage {
  id: string;
  text: string;
  type: 'agent' | 'visitor';
  timestamp: string;
}

export class TawktoAPI {
  private apiKey: string;
  private email: string;

  constructor(credentials: TawktoCredentials) {
    this.apiKey = credentials.apiKey;
    this.email = credentials.email;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await axios.get(`${TAWKTO_API_BASE}/me`, {
        headers: this.headers,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async fetchChats(startDate: Date, endDate: Date): Promise<TawktoChat[]> {
    try {
      const response = await axios.get(`${TAWKTO_API_BASE}/chats`, {
        headers: this.headers,
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      return response.data.chats;
    } catch (error) {
      throw new Error('Failed to fetch Tawk.to chats');
    }
  }
}