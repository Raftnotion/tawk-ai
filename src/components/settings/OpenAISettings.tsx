import React, { useState } from 'react';
import { Brain, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface OpenAIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export function OpenAISettings() {
  const [config, setConfig] = useState<OpenAIConfig>({
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048
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
      // TODO: Implement API call to save OpenAI settings
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
        <div className="p-2 bg-blue-100 rounded-lg">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium">OpenAI Integration</h3>
          <p className="text-sm text-gray-600">Configure AI model settings and API credentials</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="API Key"
          type="password"
          value={config.apiKey}
          onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
          placeholder="sk-..."
          required
        />

        <Select
          label="Model"
          value={config.model}
          onChange={(e) => setConfig(prev => ({ ...prev, model: e.target.value }))}
          options={[
            { value: 'gpt-4', label: 'GPT-4 (Recommended)' },
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Temperature"
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={config.temperature}
            onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            required
          />

          <Input
            label="Max Tokens"
            type="number"
            min={1}
            max={4096}
            value={config.maxTokens}
            onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
            required
          />
        </div>

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

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </form>
    </Card>
  );
}