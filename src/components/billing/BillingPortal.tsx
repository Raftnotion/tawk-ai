import React from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { StripeService } from '../../lib/services/payment/stripe';
import { formatDate, formatCurrency } from '../../lib/utils';

export function BillingPortal() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleManageSubscription = async () => {
    if (!user?.subscription) return;
    
    setLoading(true);
    setError(null);

    try {
      const stripeService = StripeService.getInstance();
      const portalUrl = await stripeService.createPortalSession(user.id);
      window.location.href = portalUrl;
    } catch (err) {
      setError('Failed to open billing portal');
    } finally {
      setLoading(false);
    }
  };

  if (!user?.subscription) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Billing & Subscription</h3>
            <p className="text-sm text-gray-600">Manage your subscription and payment methods</p>
          </div>
        </div>
        <button
          onClick={handleManageSubscription}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            'Manage Subscription'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Current Plan</div>
          <div className="mt-1 text-lg font-semibold capitalize">
            {user.subscription.plan}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Renews on {formatDate(user.subscription.expiresAt)}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Usage This Month</div>
          <div className="mt-1 text-lg font-semibold">
            5,234 / 10,000 messages
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: '52.34%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}