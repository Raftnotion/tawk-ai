import React from 'react';
import { Brain, FileText, Globe, MessageSquare } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import type { KnowledgeBase } from '../../types';

const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Product Documentation',
    description: 'Main product documentation and FAQs',
    source: 'tawkto',
    status: 'ready',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Help Center Articles',
    description: 'Scraped help center content',
    source: 'scraper',
    status: 'processing',
    createdAt: new Date('2024-03-14'),
    updatedAt: new Date('2024-03-14')
  }
];

export function KnowledgeBaseList() {
  return (
    <div className="space-y-6">
      {mockKnowledgeBases.map((kb) => (
        <KnowledgeBaseCard key={kb.id} knowledgeBase={kb} />
      ))}
    </div>
  );
}

function KnowledgeBaseCard({ knowledgeBase }: { knowledgeBase: KnowledgeBase }) {
  const sourceIcon = {
    tawkto: <MessageSquare className="h-5 w-5" />,
    scraper: <Globe className="h-5 w-5" />,
    upload: <FileText className="h-5 w-5" />
  }[knowledgeBase.source];

  const statusColor = {
    ready: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }[knowledgeBase.status];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{knowledgeBase.name}</h3>
            <p className="text-gray-600 mt-1">{knowledgeBase.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center text-gray-500 text-sm">
                {sourceIcon}
                <span className="ml-1 capitalize">{knowledgeBase.source}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Updated {formatDate(knowledgeBase.updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {knowledgeBase.status}
          </span>
        </div>
      </div>
    </div>
  );
}