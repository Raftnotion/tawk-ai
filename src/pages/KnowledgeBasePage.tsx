import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserLayout } from '../components/layout/UserLayout';
import { KnowledgeBaseList } from '../components/knowledge-base/KnowledgeBaseList';
import { CreateKnowledgeBase } from '../components/knowledge-base/CreateKnowledgeBase';

export function KnowledgeBasePage() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New
        </button>
      </div>

      {isCreating ? (
        <>
          <CreateKnowledgeBase />
          <div className="mt-6">
            <button
              onClick={() => setIsCreating(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <KnowledgeBaseList />
      )}
    </UserLayout>
  );
}