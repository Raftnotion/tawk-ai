import React from 'react';
import { Card } from '../../shared/Card';
import { User, MoreVertical } from 'lucide-react';
import { formatDate, formatCurrency } from '../../../lib/utils';

const subscriptions = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    plan: 'pro',
    amount: 49.99,
    status: 'active',
    nextBilling: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    plan: 'enterprise',
    amount: 199.99,
    status: 'active',
    nextBilling: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
  },
];

export function SubscriptionsList() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Active Subscriptions</h2>
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{subscription.user.name}</div>
                <div className="text-sm text-gray-500">{subscription.user.email}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium capitalize">{subscription.plan} Plan</div>
              <div className="text-sm text-gray-500">
                Next billing: {formatDate(subscription.nextBilling)}
              </div>
              <div className="text-sm font-medium text-blue-600">
                {formatCurrency(subscription.amount)}/month
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}