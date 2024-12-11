import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import type { GatewayConfigProps } from '../../../../types/billing';

export function StripeConfig({ config, onSave, onTest, loading, error }: GatewayConfigProps) {
  const [data, setData] = useState({
    publicKey: config?.publicKey || '',
    secretKey: config?.secretKey || '',
    webhookSecret: config?.webhookSecret || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Public Key"
        value={data.publicKey}
        onChange={(e) => setData(prev => ({ ...prev, publicKey: e.target.value }))}
        placeholder="pk_test_..."
        required
      />

      <Input
        label="Secret Key"
        type="password"
        value={data.secretKey}
        onChange={(e) => setData(prev => ({ ...prev, secretKey: e.target.value }))}
        placeholder="sk_test_..."
        required
      />

      <Input
        label="Webhook Secret"
        type="password"
        value={data.webhookSecret}
        onChange={(e) => setData(prev => ({ ...prev, webhookSecret: e.target.value }))}
        placeholder="whsec_..."
        required
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