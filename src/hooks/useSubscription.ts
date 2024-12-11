```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SubscriptionManager } from '../lib/services/payment/subscription-manager';
import { BillingAlerts } from '../lib/services/payment/billing-alerts';
import type { SubscriptionStatus, UsageMetrics } from '../lib/services/payment/types';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [usage, setUsage] = useState<UsageMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subscriptionManager = SubscriptionManager.getInstance();
  const billingAlerts = BillingAlerts.getInstance();

  useEffect(() => {
    if (!user) return;

    const loadSubscriptionData = async () => {
      try {
        setLoading(true);
        const { currentUsage, limits } = await subscriptionManager.checkUsageLimits(user.id);
        setUsage(currentUsage);
        
        // Set up billing alerts
        billingAlerts.on('warning-alert', handleWarningAlert);
        billingAlerts.on('critical-alert', handleCriticalAlert);
        
        // Check for alerts
        await billingAlerts.checkUsageAlerts(user.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionData();

    return () => {
      billingAlerts.removeAllListeners();
    };
  }, [user]);

  const handleWarningAlert = (data: any) => {
    // Implement warning alert UI
    console.warn('Usage warning:', data);
  };

  const handleCriticalAlert = (data: any) => {
    // Implement critical alert UI
    console.error('Usage critical:', data);
  };

  const updateSubscription = async (planId: string) => {
    if (!user || !subscription) return;

    try {
      setLoading(true);
      const updated = await subscriptionManager.updateSubscription(subscription.id, planId);
      setSubscription(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!user || !subscription) return;

    try {
      setLoading(true);
      await subscriptionManager.cancelSubscription(subscription.id);
      // Update subscription status
      setSubscription(prev => prev ? { ...prev, status: 'canceled' } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    usage,
    loading,
    error,
    updateSubscription,
    cancelSubscription,
  };
}
```