import React, { useState } from 'react';
import { MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface TawktoConfig {
  propertyId: string;
  widgetId: string;
  apiKey: string;
  email: string;
}

export function TawktoIntegration() {
  const [config, setConfig] = useState<TawktoConfig>({
    propertyId: '',
    widgetId: '',
    apiKey: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Implement API call to save Tawk.to settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <MessageSquare className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium">Tawk.to Integration</h3>
          <p className="text-sm text-gray-600">Connect your chat widget and configure API access</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Property ID"
            value={config.propertyId}
            onChange={(e) => setConfig(prev => ({ ...prev, propertyId: e.target.value }))}
            placeholder="64f5e9c3f2439e2743432255"
            required
          />

          <Input
            label="Widget ID"
            value={config.widgetId}
            onChange={(e) => setConfig(prev => ({ ...prev, widgetId: e.target.value }))}
            placeholder="1gc8l3bm2"
            required
          />
        </div>

        <Input
          label="API Key"
          type="password"
          value={config.apiKey}
          onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
          required
        />

        <Input
          label="Email"
          type="email"
          value={config.email}
          onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
          required
        />

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            Settings saved successfully!
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.open('https://dashboard.tawk.to', '_blank')}
          >
            Open Tawk.to Dashboard
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </form>
    </Card>
  );
}