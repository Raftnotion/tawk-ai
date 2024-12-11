import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserLayout } from '../components/layout/UserLayout';
import { AgentList } from '../components/agents/AgentList';
import { CreateAgent } from '../components/agents/CreateAgent';

const mockKnowledgeBases = [
  {
    id: 'kb1',
    userId: 'user1',
    name: 'Product Documentation',
    description: 'Main product documentation and FAQs',
    source: 'tawkto',
    status: 'ready',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
  },
];

export function AgentsPage() {
  const [isCreating, setIsCreating] = useState(false);

  const handleAgentCreated = (agent: any) => {
    console.log('Agent created:', agent);
    setIsCreating(false);
    // TODO: Update agents list
  };

  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI Agents</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Agent
        </button>
      </div>

      {isCreating ? (
        <CreateAgent
          knowledgeBases={mockKnowledgeBases}
          onComplete={handleAgentCreated}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <AgentList />
      )}
    </UserLayout>
  );
}