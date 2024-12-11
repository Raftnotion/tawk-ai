import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { AdminStats } from '../../components/admin/dashboard/AdminStats';
import { SystemHealth } from '../../components/admin/dashboard/SystemHealth';
import { RevenueChart } from '../../components/admin/dashboard/RevenueChart';
import { UserActivityLog } from '../../components/admin/dashboard/UserActivityLog';
import { ErrorDashboard } from '../../components/admin/error/ErrorDashboard';

export function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <AdminStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <SystemHealth />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserActivityLog />
          <ErrorDashboard />
        </div>
      </div>
    </AdminLayout>
  );
}