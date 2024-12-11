```typescript
import React from 'react';
import { MessageSquare, Bot, Brain } from 'lucide-react';
import { Card } from '../shared/Card';
import type { UsageMetrics as UsageMetricsType } from '../../lib/services/payment/types';

interface UsageMetricsProps {
  usage: UsageMetricsType;
  limits: UsageMetricsType;
}

export function UsageMetrics({ usage, limits }: UsageMetricsProps) {
  const getUsagePercentage = (current: number, limit: number) => {
    return (current / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-red-600';
    if (percentage >= 80) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6">Usage Metrics</h3>
      
      <div className="space-y-6">
        {/* Messages Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Messages</span>
            </div>
            <span className="text-sm text-gray-600">
              {usage.messages.toLocaleString()} / {limits.messages.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(usage.messages, limits.messages))}`}
              style={{ width: `${Math.min(getUsagePercentage(usage.messages, limits.messages), 100)}%` }}
            />
          </div>
        </div>

        {/* AI Agents Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-purple-600" />
              <span className="font-medium">AI Agents</span>
            </div>
            <span className="text-sm text-gray-600">
              {usage.agents} / {limits.agents}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(usage.agents, limits.agents))}`}
              style={{ width: `${Math.min(getUsagePercentage(usage.agents, limits.agents), 100)}%` }}
            />
          </div>
        </div>

        {/* Knowledge Bases Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Knowledge Bases</span>
            </div>
            <span className="text-sm text-gray-600">
              {usage.knowledgeBases} / {limits.knowledgeBases}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(usage.knowledgeBases, limits.knowledgeBases))}`}
              style={{ width: `${Math.min(getUsagePercentage(usage.knowledgeBases, limits.knowledgeBases), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
```