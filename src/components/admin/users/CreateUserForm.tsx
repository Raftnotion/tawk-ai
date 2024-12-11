import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../../shared/Input';
import { Select } from '../../shared/Select';
import { Button } from '../../shared/Button';
import { cn } from '../../../lib/utils';

interface CreateUserFormProps {
  onComplete: (userData: any) => void;
  onCancel: () => void;
}

export function CreateUserForm({ onComplete, onCancel }: CreateUserFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    plan: 'free',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onComplete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Input
        label="Password"
        type="password"
        value={data.password}
        onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
        required
      />

      <Select
        label="Role"
        value={data.role}
        onChange={(e) => setData(prev => ({ ...prev, role: e.target.value }))}
        options={[
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' },
        ]}
      />

      <Select
        label="Subscription Plan"
        value={data.plan}
        onChange={(e) => setData(prev => ({ ...prev, plan: e.target.value }))}
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Creating...
            </>
          ) : (
            'Create User'
          )}
        </Button>
      </div>
    </form>
  );
}