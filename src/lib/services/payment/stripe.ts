import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CredentialManager } from '../credential-manager';
import { ErrorLogger } from '../error-logger';

export interface PriceInfo {
  id: string;
  productId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export class StripeService {
  private static instance: StripeService;
  private stripePromise: Promise<any>;
  private errorLogger: ErrorLogger;
  private apiUrl = 'https://api.stripe.com/v1';

  private constructor() {
    this.errorLogger = new ErrorLogger();
    this.stripePromise = this.initializeStripe();
  }

  static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  private async initializeStripe(): Promise<any> {
    const credentials = await CredentialManager.getInstance().getCredentials('stripe');
    if (!credentials?.publicKey) {
      throw new Error('Stripe public key not found');
    }
    return loadStripe(credentials.publicKey);
  }

  async createCheckoutSession(priceId: string, userId: string): Promise<string> {
    try {
      const response = await axios.post('/api/create-checkout-session', {
        priceId,
        userId,
      });
      
      const { sessionId } = response.data;
      const stripe = await this.stripePromise;
      
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

      return sessionId;
    } catch (error) {
      await this.errorLogger.logError('stripe', error as Error, {
        method: 'createCheckoutSession',
        priceId,
        userId,
      });
      throw error;
    }
  }

  async createPortalSession(customerId: string): Promise<string> {
    try {
      const response = await axios.post('/api/create-portal-session', {
        customerId,
      });
      return response.data.url;
    } catch (error) {
      await this.errorLogger.logError('stripe', error as Error, {
        method: 'createPortalSession',
        customerId,
      });
      throw error;
    }
  }

  async getPrices(): Promise<PriceInfo[]> {
    // Mock prices for demo
    return [
      {
        id: 'price_free',
        productId: 'prod_free',
        name: 'Free',
        description: 'Perfect for getting started',
        amount: 0,
        currency: 'USD',
        interval: 'month',
        features: [
          '1 AI Agent',
          '1,000 messages/month',
          'Basic knowledge base',
          'Email support',
        ],
      },
      {
        id: 'price_pro',
        productId: 'prod_pro',
        name: 'Pro',
        description: 'For growing businesses',
        amount: 49,
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited AI Agents',
          '10,000 messages/month',
          'Advanced knowledge base',
          'Priority support',
          'Custom AI training',
        ],
      },
      {
        id: 'price_enterprise',
        productId: 'prod_enterprise',
        name: 'Enterprise',
        description: 'For large organizations',
        amount: 199,
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited everything',
          'Dedicated support',
          'Custom integrations',
          'SLA guarantee',
          'On-premise deployment',
        ],
      },
    ];
  }
}