import React from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import { Input } from '../../../components/shared/Input';
import { Button } from '../../../components/shared/Button';
import { AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormProps {
  isAdminLogin: boolean;
}

export function LoginForm({ isAdminLogin }: LoginFormProps) {
  const { 
    credentials,
    loading,
    error,
    handleChange,
    handleSubmit
  } = useLoginForm({ isAdminLogin });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  );
}