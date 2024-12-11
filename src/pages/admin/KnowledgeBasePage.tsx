import React from 'react';
import { AdminLayout } from '../../components/admin/Layout';
import { KnowledgeBaseList } from '../../components/knowledge-base/KnowledgeBaseList';
import { CreateKnowledgeBase } from '../../components/knowledge-base/CreateKnowledgeBase';
import { Plus } from 'lucide-react';
import { Button } from '../../components/shared/Button';

export function KnowledgeBasePage() {
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Knowledge Base Management</h1>
          <Button
            onClick={() => setIsCreating(true)}
            icon={<Plus className="h-5 w-5" />}
          >
            Create New
          </Button>
        </div>

        {isCreating ? (
          <>
            <CreateKnowledgeBase />
            <div className="mt-6">
              <Button
                variant="ghost"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <KnowledgeBaseList />
        )}
      </div>
    </AdminLayout>
  );
}