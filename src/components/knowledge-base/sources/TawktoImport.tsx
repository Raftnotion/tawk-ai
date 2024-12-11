import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { TawktoAPI, type TawktoCredentials, type TawktoChat } from '../../../lib/api/tawkto';
import { KnowledgeBaseService } from '../../../lib/services/knowledge-base';
import { cn } from '../../../lib/utils';

interface TawktoImportProps {
  onComplete: (knowledgeBase: any) => void;
  onCancel: () => void;
}

export function TawktoImport({ onComplete, onCancel }: TawktoImportProps) {
  const [credentials, setCredentials] = useState<TawktoCredentials>({
    apiKey: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const api = new TawktoAPI(credentials);
      const isValid = await api.validateCredentials();

      if (!isValid) {
        throw new Error('Invalid Tawk.to credentials');
      }

      const chats = await api.fetchChats(
        new Date(dateRange.startDate),
        new Date(dateRange.endDate)
      );

      const knowledgeBaseService = new KnowledgeBaseService();
      const knowledgeBase = await knowledgeBaseService.createFromTawkto({
        name,
        description,
        source: 'tawkto',
        userId: 'current-user', // TODO: Get from auth context
        rawData: chats,
      });

      onComplete(knowledgeBase);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import data from Tawk.to');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Connect to Tawk.to</h3>
        <p className="text-gray-600">
          Enter your Tawk.to API credentials to import chat history and FAQs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Knowledge Base Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={credentials.email}
            onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={credentials.apiKey}
            onChange={(e) => setCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg",
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            )}
          >
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            {loading ? 'Processing...' : 'Import'}
          </button>
        </div>
      </form>
    </div>
  );
}