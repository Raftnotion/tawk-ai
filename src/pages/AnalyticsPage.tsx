import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { UserLayout } from '../components/layout/UserLayout';
import { useAnalytics } from '../lib/api/hooks/useAnalytics';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';

export function AnalyticsPage() {
  const { data: analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <Card className="text-center text-red-600">
          Failed to load analytics data
        </Card>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="h-4 w-4" />}
          >
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-sm text-gray-600">Total Chats</div>
          <div className="text-2xl font-bold mt-1">{analytics?.totalChats}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Active Users</div>
          <div className="text-2xl font-bold mt-1">{analytics?.activeUsers}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">AI Agents</div>
          <div className="text-2xl font-bold mt-1">{analytics?.aiAgents}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Knowledge Bases</div>
          <div className="text-2xl font-bold mt-1">{analytics?.knowledgeBases}</div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Chat Performance</h2>
          <AnalyticsChart />
        </Card>
      </div>
    </UserLayout>
  );
}