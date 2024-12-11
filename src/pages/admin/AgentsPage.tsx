import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { AgentList } from '../../components/agents/AgentList';
import { CreateAgent } from '../../components/agents/CreateAgent';
import { Plus } from 'lucide-react';
import { Button } from '../../components/shared/Button';
import { useKnowledgeBases } from '../../lib/api/hooks/useKnowledgeBase';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { Card } from '../../components/shared/Card';

export function AgentsPage() {
  const [isCreating, setIsCreating] = React.useState(false);
  const { data: knowledgeBases, isLoading, error } = useKnowledgeBases();

  const handleAgentCreated = () => {
    setIsCreating(false);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Card className="text-center text-red-600">
          Failed to load knowledge bases
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Agents Management</h1>
          <Button
            onClick={() => setIsCreating(true)}
            icon={<Plus className="h-5 w-5" />}
          >
            Create Agent
          </Button>
        </div>

        {isCreating ? (
          <>
            <CreateAgent
              knowledgeBases={knowledgeBases || []}
              onComplete={handleAgentCreated}
              onCancel={() => setIsCreating(false)}
            />
          </>
        ) : (
          <AgentList />
        )}
      </div>
    </AdminLayout>
  );
}