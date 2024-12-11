```typescript
import { StripeService } from './stripe';
import { UsageTracker } from './usage-tracker';
import type { PaymentPlan, SubscriptionStatus, UsageMetrics } from './types';

export class SubscriptionManager {
  private static instance: SubscriptionManager;
  private stripe: StripeService;
  private usageTracker: UsageTracker;

  private constructor() {
    this.stripe = StripeService.getInstance();
    this.usageTracker = UsageTracker.getInstance();
  }

  static getInstance(): SubscriptionManager {
    if (!SubscriptionManager.instance) {
      SubscriptionManager.instance = new SubscriptionManager();
    }
    return SubscriptionManager.instance;
  }

  async createSubscription(userId: string, planId: string): Promise<SubscriptionStatus> {
    try {
      const subscription = await this.stripe.createSubscription(userId, planId);
      return subscription;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = true): Promise<void> {
    try {
      await this.stripe.cancelSubscription(subscriptionId, cancelAtPeriodEnd);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }

  async updateSubscription(subscriptionId: string, planId: string): Promise<SubscriptionStatus> {
    try {
      const subscription = await this.stripe.updateSubscription(subscriptionId, planId);
      return subscription;
    } catch (error) {
      console.error('Failed to update subscription:', error);
      throw error;
    }
  }

  async checkUsageLimits(userId: string): Promise<{
    withinLimits: boolean;
    currentUsage: UsageMetrics;
    limits: UsageMetrics;
  }> {
    const subscription = await this.stripe.getSubscription(userId);
    const currentUsage = await this.usageTracker.getCurrentUsage(userId);
    const plan = await this.stripe.getPlan(subscription.planId);

    const withinLimits = 
      currentUsage.messages <= plan.limits.messages &&
      currentUsage.agents <= plan.limits.agents &&
      currentUsage.knowledgeBases <= plan.limits.knowledgeBases;

    return {
      withinLimits,
      currentUsage,
      limits: plan.limits,
    };
  }

  async handlePaymentFailure(subscriptionId: string): Promise<void> {
    // Implement retry logic and notifications
    try {
      await this.stripe.retryPayment(subscriptionId);
      // Send notification to user
    } catch (error) {
      console.error('Payment retry failed:', error);
      // Send escalated notification
      throw error;
    }
  }
}
```