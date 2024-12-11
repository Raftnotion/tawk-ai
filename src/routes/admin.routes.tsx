import React from 'react';
import { Route } from 'react-router-dom';
import { AdminRoute } from '../components/auth/AdminRoute';
import { AdminLoginPage } from '../pages/admin/LoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { AdminBillingPage } from '../pages/admin/BillingPage';
import { SystemHealthPage } from '../pages/admin/SystemHealthPage';
import { KnowledgeBasePage } from '../pages/admin/KnowledgeBasePage';
import { AgentsPage } from '../pages/admin/AgentsPage';
import { SettingsPage } from '../pages/admin/SettingsPage';

export const adminRoutes = (
  <Route path="admin">
    <Route path="login" element={<AdminLoginPage />} />
    <Route index element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
    <Route path="users" element={<AdminRoute><UsersPage /></AdminRoute>} />
    <Route path="billing" element={<AdminRoute><AdminBillingPage /></AdminRoute>} />
    <Route path="system" element={<AdminRoute><SystemHealthPage /></AdminRoute>} />
    <Route path="knowledge-bases" element={<AdminRoute><KnowledgeBasePage /></AdminRoute>} />
    <Route path="agents" element={<AdminRoute><AgentsPage /></AdminRoute>} />
    <Route path="settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
  </Route>
);