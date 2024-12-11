import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { OpenAISettings } from '../../components/settings/OpenAISettings';

export function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        
        <div className="space-y-6">
          <OpenAISettings />
        </div>
      </div>
    </AdminLayout>
  );
}