import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { Card } from '../../components/shared/Card';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLoginPage() {
  const { user } = useAuth();

  // If already logged in as admin, redirect to admin dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // If logged in as regular user, redirect to user dashboard
  if (user?.role === 'user') {
    return <Navigate to="/dashboard" state={{ 
      error: "You don't have permission to access the admin area."
    }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Bot className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Regular users should login{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <LoginForm isAdminLogin={true} />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Admin Credentials</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Admin: admin@tawkai.com / admin123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}