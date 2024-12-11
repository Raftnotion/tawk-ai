import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Public Pages
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/LoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { AdminBillingPage } from '../pages/admin/BillingPage';
import { SystemHealthPage } from '../pages/admin/SystemHealthPage';
import { KnowledgeBasePage as AdminKnowledgeBasePage } from '../pages/admin/KnowledgeBasePage';
import { AgentsPage as AdminAgentsPage } from '../pages/admin/AgentsPage';
import { SettingsPage as AdminSettingsPage } from '../pages/admin/SettingsPage';

// User Pages
import { DashboardPage } from '../pages/DashboardPage';
import { KnowledgeBasePage } from '../pages/KnowledgeBasePage';
import { AgentsPage } from '../pages/AgentsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { BillingPage } from '../pages/BillingPage';

// Route Guards
import { AdminRoute } from '../components/auth/AdminRoute';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="login" element={<AdminLoginPage />} />
        <Route index element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
        <Route path="users" element={<AdminRoute><UsersPage /></AdminRoute>} />
        <Route path="billing" element={<AdminRoute><AdminBillingPage /></AdminRoute>} />
        <Route path="system" element={<AdminRoute><SystemHealthPage /></AdminRoute>} />
        <Route path="knowledge-bases" element={<AdminRoute><AdminKnowledgeBasePage /></AdminRoute>} />
        <Route path="agents" element={<AdminRoute><AdminAgentsPage /></AdminRoute>} />
        <Route path="settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
      </Route>

      {/* User Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
      <Route path="/agents" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />

      {/* Catch-all redirect */}
      <Route 
        path="*" 
        element={
          user 
            ? user.role === 'admin'
              ? <Navigate to="/admin" replace />
              : <Navigate to="/dashboard" replace />
            : <Navigate to="/" replace />
        } 
      />
    </Routes>
  );
}