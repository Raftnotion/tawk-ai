export interface TawktoWebhookEvent {
  type: 'message' | 'conversation_start' | 'conversation_end';
  timestamp: string;
  data: {
    chatId: string;
    propertyId: string;
    message?: TawktoMessage;
    visitor?: TawktoVisitor;
  };
}

export interface TawktoMessage {
  id: string;
  text: string;
  type: 'visitor' | 'agent';
  timestamp: string;
}

export interface TawktoVisitor {
  id: string;
  name: string;
  email?: string;
  browser: string;
  os: string;
  device: string;
}

export interface TawktoChat {
  id: string;
  propertyId: string;
  messages: TawktoMessage[];
  visitor: TawktoVisitor;
  startedAt: string;
  endedAt?: string;
}