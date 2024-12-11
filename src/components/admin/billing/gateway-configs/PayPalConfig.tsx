import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import type { GatewayConfigProps } from '../../../../types/billing';

export function PayPalConfig({ config, onSave, onTest, loading, error }: GatewayConfigProps) {
  const [data, setData] = useState({
    clientId: config?.clientId || '',
    clientSecret: config?.clientSecret || '',
    environment: config?.environment || 'sandbox',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Client ID"
        value={data.clientId}
        onChange={(e) => setData(prev => ({ ...prev, clientId: e.target.value }))}
        required
      />

      <Input
        label="Client Secret"
        type="password"
        value={data.clientSecret}
        onChange={(e) => setData(prev => ({ ...prev, clientSecret: e.target.value }))}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Environment
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="sandbox"
              checked={data.environment === 'sandbox'}
              onChange={(e) => setData(prev => ({ ...prev, environment: e.target.value as 'sandbox' | 'production' }))}
              className="mr-2"
            />
            Sandbox
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="production"
              checked={data.environment === 'production'}
              onChange={(e) => setData(prev => ({ ...prev, environment: e.target.value as 'sandbox' | 'production' }))}
              className="mr-2"
            />
            Production
          </label>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onTest}
          disabled={loading}
        >
          Test Connection
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Save Configuration
        </Button>
      </div>
    </form>
  );
}