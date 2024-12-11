import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { Card } from '../../components/shared/Card';
import { Input } from '../../components/shared/Input';
import { Button } from '../../components/shared/Button';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, Loader2, User } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Update profile:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Full Name"
                value={data.name}
                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={data.email}
                onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              <hr className="my-6" />

              <h3 className="text-lg font-medium mb-4">Change Password</h3>

              <Input
                label="Current Password"
                type="password"
                value={data.currentPassword}
                onChange={(e) => setData(prev => ({ ...prev, currentPassword: e.target.value }))}
              />

              <Input
                label="New Password"
                type="password"
                value={data.newPassword}
                onChange={(e) => setData(prev => ({ ...prev, newPassword: e.target.value }))}
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={data.confirmPassword}
                onChange={(e) => setData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}