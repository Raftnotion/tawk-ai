import React from 'react';
import { Card } from '../../shared/Card';
import { DollarSign, TrendingUp, Users, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

const stats = [
  {
    label: 'Monthly Revenue',
    value: 45678.90,
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Active Subscriptions',
    value: 892,
    change: '+5.2%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Average Revenue',
    value: 51.21,
    change: '+8.1%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Failed Payments',
    value: 23,
    change: '-2.3%',
    trend: 'down',
    icon: CreditCard,
  },
];

export function BillingOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">
                {typeof stat.value === 'number' && stat.label.includes('Revenue')
                  ? formatCurrency(stat.value)
                  : stat.value}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}