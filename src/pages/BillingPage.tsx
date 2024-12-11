import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PricingPlans } from '../components/billing/PricingPlans';
import { BillingPortal } from '../components/billing/BillingPortal';

export function BillingPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Billing & Plans</h1>
      
      {user?.subscription && <BillingPortal />}
      
      <div className="mt-8">
        <PricingPlans />
      </div>
    </div>
  );
}