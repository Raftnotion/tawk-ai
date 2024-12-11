import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { AIAgent } from '../../types';

interface AgentSettings {
  language: string;
  tone: string;
  fallbackMessage: string;
  maxResponseTime: number;
  greetingMessage: string;
}

interface AgentSettingsProps {
  agent: AIAgent;
  onSave: (settings: AgentSettings) => Promise<void>;
  onClose: () => void;
}

export function AgentSettings({ agent, onSave, onClose }: AgentSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<AgentSettings>({
    language: agent.language,
    tone: agent.tone,
    fallbackMessage: "I'll connect you with a human agent for better assistance.",
    maxResponseTime: 30,
    greetingMessage: "Hello! I'm an AI assistant. How can I help you today?",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave(settings);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Agent Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
            Conversation Tone
          </label>
          <select
            id="tone"
            value={settings.tone}
            onChange={(e) => setSettings(prev => ({ ...prev, tone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        <div>
          <label htmlFor="greetingMessage" className="block text-sm font-medium text-gray-700">
            Greeting Message
          </label>
          <textarea
            id="greetingMessage"
            value={settings.greetingMessage}
            onChange={(e) => setSettings(prev => ({ ...prev, greetingMessage: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="fallbackMessage" className="block text-sm font-medium text-gray-700">
            Fallback Message
          </label>
          <textarea
            id="fallbackMessage"
            value={settings.fallbackMessage}
            onChange={(e) => setSettings(prev => ({ ...prev, fallbackMessage: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="maxResponseTime" className="block text-sm font-medium text-gray-700">
            Max Response Time (seconds)
          </label>
          <input
            type="number"
            id="maxResponseTime"
            value={settings.maxResponseTime}
            onChange={(e) => setSettings(prev => ({ ...prev, maxResponseTime: parseInt(e.target.value, 10) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min={5}
            max={120}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600",
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            )}
          >
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}