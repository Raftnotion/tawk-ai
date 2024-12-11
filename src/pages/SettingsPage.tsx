import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserLayout } from '../components/layout/UserLayout';
import { Card } from '../components/shared/Card';
import { UserProfile } from '../components/dashboard/UserProfile';
import { BillingPortal } from '../components/billing/BillingPortal';
import { TawktoIntegration } from '../components/settings/TawktoIntegration';
import { OpenAISettings } from '../components/settings/OpenAISettings';

export function SettingsPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handleProfileUpdate = async (data: Partial<typeof user>) => {
    // TODO: Implement profile update
    console.log('Update profile:', data);
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          <UserProfile user={user} onUpdate={handleProfileUpdate} />
        </Card>

        <BillingPortal />

        <Card>
          <h2 className="text-lg font-semibold mb-4">Integrations</h2>
          <div className="space-y-6">
            <TawktoIntegration />
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}