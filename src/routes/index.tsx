import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { publicRoutes } from './public.routes';
import { adminRoutes } from './admin.routes';
import { userRoutes } from './user.routes';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes}

      {/* Admin Routes */}
      {adminRoutes}

      {/* Protected User Routes */}
      {userRoutes}

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