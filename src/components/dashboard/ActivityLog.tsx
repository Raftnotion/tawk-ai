import React from 'react';
import { Bot, MessageSquare, Brain, AlertCircle } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import type { UserActivity } from '../../types';

const mockActivities: UserActivity[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    action: 'agent_created',
    details: 'Created new AI agent "Support Assistant"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    userId: 'user1',
    userName: 'John Doe',
    action: 'knowledge_base_updated',
    details: 'Updated knowledge base "Product Documentation"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

const activityIcons = {
  agent_created: Bot,
  agent_updated: Bot,
  chat_completed: MessageSquare,
  knowledge_base_created: Brain,
  knowledge_base_updated: Brain,
  error: AlertCircle,
};

export function ActivityLog() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {mockActivities.map((activity) => {
          const Icon = activityIcons[activity.action as keyof typeof activityIcons] || AlertCircle;
          
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.details}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}