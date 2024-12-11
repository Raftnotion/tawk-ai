import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { SystemMetrics } from '../../components/admin/system/SystemMetrics';
import { ErrorLogs } from '../../components/admin/system/ErrorLogs';

export function SystemHealthPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">System Health</h1>
        <SystemMetrics />
        <ErrorLogs />
      </div>
    </AdminLayout>
  );
}