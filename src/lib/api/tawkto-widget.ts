import type { AIAgent } from '../../types';

export interface TawktoWidgetConfig {
  propertyId: string;
  widgetId: string;
  agentId: string;
}

export class TawktoWidgetService {
  private static WIDGET_URL = 'https://embed.tawk.to';

  static injectChatWidget(config: TawktoWidgetConfig): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${this.WIDGET_URL}/${config.propertyId}/${config.widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Add custom settings for AI agent integration
    const settings = {
      customAttributes: {
        agentId: config.agentId,
      },
    };

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      window.Tawk_API.setAttributes(settings.customAttributes);
    };

    document.head.appendChild(script);
  }

  static removeChatWidget(): void {
    if (window.Tawk_API) {
      window.Tawk_API.remove();
    }
  }
}

// Add TypeScript declarations for Tawk.to
declare global {
  interface Window {
    Tawk_API?: {
      onLoad: () => void;
      setAttributes: (attributes: Record<string, string>) => void;
      remove: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}