```typescript
import { EventEmitter } from 'events';
import { UsageTracker } from './usage-tracker';
import { SubscriptionManager } from './subscription-manager';
import type { UsageMetrics } from './types';

interface AlertThresholds {
  warning: number;
  critical: number;
}

export class BillingAlerts extends EventEmitter {
  private static instance: BillingAlerts;
  private usageTracker: UsageTracker;
  private subscriptionManager: SubscriptionManager;

  private thresholds: AlertThresholds = {
    warning: 0.8, // 80% of limit
    critical: 0.95, // 95% of limit
  };

  private constructor() {
    super();
    this.usageTracker = UsageTracker.getInstance();
    this.subscriptionManager = SubscriptionManager.getInstance();
  }

  static getInstance(): BillingAlerts {
    if (!BillingAlerts.instance) {
      BillingAlerts.instance = new BillingAlerts();
    }
    return BillingAlerts.instance;
  }

  async checkUsageAlerts(userId: string): Promise<void> {
    const { currentUsage, limits } = await this.subscriptionManager.checkUsageLimits(userId);
    
    // Check each metric
    this.checkMetric(userId, 'messages', currentUsage.messages, limits.messages);
    this.checkMetric(userId, 'agents', currentUsage.agents, limits.agents);
    this.checkMetric(userId, 'knowledgeBases', currentUsage.knowledgeBases, limits.knowledgeBases);
  }

  private checkMetric(userId: string, metric: keyof UsageMetrics, current: number, limit: number): void {
    const usagePercentage = current / limit;

    if (usagePercentage >= this.thresholds.critical) {
      this.emit('critical-alert', {
        userId,
        metric,
        current,
        limit,
        percentage: usagePercentage,
      });
    } else if (usagePercentage >= this.thresholds.warning) {
      this.emit('warning-alert', {
        userId,
        metric,
        current,
        limit,
        percentage: usagePercentage,
      });
    }
  }

  setThresholds(warning: number, critical: number): void {
    this.thresholds = { warning, critical };
  }
}
```