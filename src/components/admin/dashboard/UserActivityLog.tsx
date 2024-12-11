import React from 'react';
import { Card } from '../../shared/Card';
import { Bot, MessageSquare, Brain, User } from 'lucide-react';
import { formatDate } from '../../../lib/utils';

interface Activity {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'created_agent',
    details: 'Created new AI agent "Support Assistant"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'updated_kb',
    details: 'Updated knowledge base "Product Documentation"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'subscription_upgraded',
    details: 'Upgraded to Pro plan',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
];

const actionIcons = {
  created_agent: Bot,
  updated_kb: Brain,
  subscription_upgraded: User,
  chat_completed: MessageSquare,
};

export function UserActivityLog() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">User Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = actionIcons[activity.action as keyof typeof actionIcons] || MessageSquare;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}