import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserLayout } from '../components/layout/UserLayout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { ActivityLog } from '../components/dashboard/ActivityLog';
import { SubscriptionCard } from '../components/dashboard/SubscriptionCard';
import { UserProfile } from '../components/dashboard/UserProfile';
import { ErrorAlert } from '../components/error/ErrorAlert';

export function DashboardPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(
    (location.state as any)?.error || null
  );

  useEffect(() => {
    // Clear the error state from location after showing it
    if (location.state?.error) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (!user) {
    return null;
  }

  const handleProfileUpdate = async (data: Partial<typeof user>) => {
    // TODO: Implement profile update
    console.log('Update profile:', data);
  };

  const handleUpgradeSubscription = () => {
    // TODO: Implement subscription upgrade
    console.log('Upgrade subscription');
  };

  return (
    <UserLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {error && (
          <div className="lg:col-span-3">
            <ErrorAlert 
              message={error} 
              onClose={() => setError(null)}
            />
          </div>
        )}
        
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DashboardStats />
          <AnalyticsChart />
          <ActivityLog />
        </div>
        
        <div className="space-y-6">
          <SubscriptionCard
            user={user}
            onUpgrade={handleUpgradeSubscription}
          />
          <UserProfile
            user={user}
            onUpdate={handleProfileUpdate}
          />
        </div>
      </div>
    </UserLayout>
  );
}