import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminRoute } from '../components/auth/AdminRoute';
import { AdminLoginPage } from '../pages/admin/LoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { AdminBillingPage } from '../pages/admin/BillingPage';
import { SystemHealthPage } from '../pages/admin/SystemHealthPage';
import { KnowledgeBasePage } from '../pages/admin/KnowledgeBasePage';
import { AgentsPage } from '../pages/admin/AgentsPage';
import { SettingsPage } from '../pages/admin/SettingsPage';

export const adminRoutes = [
  <Route key="admin-login" path="admin/login" element={<AdminLoginPage />} />,
  <Route key="admin" path="admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />,
  <Route key="admin-users" path="admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />,
  <Route key="admin-billing" path="admin/billing" element={<AdminRoute><AdminBillingPage /></AdminRoute>} />,
  <Route key="admin-system" path="admin/system" element={<AdminRoute><SystemHealthPage /></AdminRoute>} />,
  <Route key="admin-kb" path="admin/knowledge-bases" element={<AdminRoute><KnowledgeBasePage /></AdminRoute>} />,
  <Route key="admin-agents" path="admin/agents" element={<AdminRoute><AgentsPage /></AdminRoute>} />,
  <Route key="admin-settings" path="admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />,
];