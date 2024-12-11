import React from 'react';
import { AgentCard } from './AgentCard';
import type { AIAgent } from '../../types';

const mockAgents: AIAgent[] = [
  {
    id: '1',
    userId: 'user1',
    knowledgeBaseId: 'kb1',
    name: 'Support Assistant',
    description: 'General customer support agent',
    language: 'en',
    tone: 'professional',
    status: 'active',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    userId: 'user1',
    knowledgeBaseId: 'kb2',
    name: 'Sales Bot',
    description: 'Product information and sales assistance',
    language: 'en',
    tone: 'friendly',
    status: 'inactive',
    createdAt: new Date('2024-03-14'),
  },
];

export function AgentList() {
  const handleStatusChange = (agentId: string, status: AIAgent['status']) => {
    console.log('Status change:', { agentId, status });
    // TODO: Implement status update
  };

  return (
    <div className="space-y-6">
      {mockAgents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}