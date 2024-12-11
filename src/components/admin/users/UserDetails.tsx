import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, Loader2 } from 'lucide-react';
import { formatDate, cn } from '../../../lib/utils';
import type { User } from '../../../types';

interface UserDetailsProps {
  user: User;
  onBack: () => void;
}

export function UserDetails({ user, onBack }: UserDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePlan = async (plan: string) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement plan update
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Update plan:', { userId: user.id, plan });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendUser = async () => {
    if (!confirm('Are you sure you want to suspend this user?')) return;
    
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement user suspension
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Suspend user:', user.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suspend user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Users
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {formatDate(user.createdAt)}
            </p>
          </div>

          <button
            onClick={handleSuspendUser}
            disabled={loading}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Suspend User
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Subscription Details</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-500">Current Plan</div>
              <div className="text-lg font-medium capitalize mt-1">
                {user.subscription?.plan}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-500">Status</div>
              <div className="text-lg font-medium capitalize mt-1">
                {user.subscription?.status}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-500">Expires</div>
              <div className="text-lg font-medium mt-1">
                {formatDate(user.subscription?.expiresAt || new Date())}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Change Plan</h4>
            <div className="flex space-x-4">
              {['free', 'pro', 'enterprise'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => handleUpdatePlan(plan)}
                  disabled={loading || plan === user.subscription?.plan}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    plan === user.subscription?.plan
                      ? "bg-blue-50 text-blue-600 cursor-default"
                      : "border hover:border-blue-500 hover:text-blue-600"
                  )}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}