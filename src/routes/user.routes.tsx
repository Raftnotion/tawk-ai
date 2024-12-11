import React from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardPage } from '../pages/DashboardPage';
import { KnowledgeBasePage } from '../pages/KnowledgeBasePage';
import { AgentsPage } from '../pages/AgentsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { BillingPage } from '../pages/BillingPage';

export const userRoutes = [
  <Route key="dashboard" path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />,
  <Route key="kb" path="knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />,
  <Route key="agents" path="agents" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />,
  <Route key="analytics" path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />,
  <Route key="settings" path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />,
  <Route key="billing" path="billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />,
];