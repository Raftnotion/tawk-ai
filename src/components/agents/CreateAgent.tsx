import React, { useState } from 'react';
import { Bot, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { KnowledgeBase } from '../../types';

interface CreateAgentProps {
  onComplete: (agent: any) => void;
  onCancel: () => void;
  knowledgeBases: KnowledgeBase[];
}

export function CreateAgent({ onComplete, onCancel, knowledgeBases }: CreateAgentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    knowledgeBaseId: '',
    language: 'en',
    tone: 'professional',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement agent creation API call
      const agent = {
        ...data,
        id: crypto.randomUUID(),
        status: 'active',
        createdAt: new Date(),
      };
      onComplete(agent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create AI agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Create AI Agent</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="knowledgeBase" className="block text-sm font-medium text-gray-700">
            Knowledge Base
          </label>
          <select
            id="knowledgeBase"
            value={data.knowledgeBaseId}
            onChange={(e) => setData(prev => ({ ...prev, knowledgeBaseId: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a knowledge base</option>
            {knowledgeBases.map(kb => (
              <option key={kb.id} value={kb.id}>{kb.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            value={data.language}
            onChange={(e) => setData(prev => ({ ...prev, language: e.target.value }))}
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
            value={data.tone}
            onChange={(e) => setData(prev => ({ ...prev, tone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
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
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600",
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            )}
          >
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Create Agent
          </button>
        </div>
      </form>
    </div>
  );
}