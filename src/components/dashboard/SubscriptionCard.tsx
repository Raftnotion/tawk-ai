import React from 'react';
import { Crown, ChevronRight } from 'lucide-react';
import { formatDate, formatCurrency } from '../../lib/utils';
import type { User } from '../../types';

interface SubscriptionCardProps {
  user: User;
  onUpgrade: () => void;
}

export function SubscriptionCard({ user, onUpgrade }: SubscriptionCardProps) {
  const subscription = user.subscription;

  if (!subscription) {
    return null;
  }

  const isActive = subscription.status === 'active';
  const daysLeft = Math.ceil(
    (subscription.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold capitalize">{subscription.plan} Plan</h3>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {isActive ? (
              <>
                Your subscription expires in {daysLeft} days
                <br />
                on {formatDate(subscription.expiresAt)}
              </>
            ) : (
              'Your subscription has expired'
            )}
          </p>
        </div>
        
        {subscription.plan !== 'enterprise' && (
          <button
            onClick={onUpgrade}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            Upgrade Plan
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>

      {!isActive && (
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
          Your subscription has expired. Upgrade now to continue using all features.
        </div>
      )}
    </div>
  );
}