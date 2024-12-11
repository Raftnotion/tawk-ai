import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { BillingOverview } from '../../components/admin/billing/BillingOverview';
import { SubscriptionsList } from '../../components/admin/billing/SubscriptionsList';
import { TransactionHistory } from '../../components/admin/billing/TransactionHistory';
import { PaymentMethods } from '../../components/admin/billing/PaymentMethods';

export function AdminBillingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Billing Management</h1>
        <BillingOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubscriptionsList />
          <PaymentMethods />
        </div>
        <TransactionHistory />
      </div>
    </AdminLayout>
  );
}