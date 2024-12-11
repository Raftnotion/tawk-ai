import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { UserManagement } from '../../components/admin/users/UserManagement';

export function UsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <UserManagement />
      </div>
    </AdminLayout>
  );
}