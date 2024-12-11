import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ChartData {
  date: string;
  chats: number;
  successRate: number;
}

const mockData: ChartData[] = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
  chats: Math.floor(Math.random() * 100) + 20,
  successRate: Math.floor(Math.random() * 30) + 70,
})).reverse();

export function AnalyticsChart() {
  const maxChats = Math.max(...mockData.map(d => d.chats));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Chat Analytics</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            Chats
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            Success Rate
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between">
          {mockData.map((data, i) => (
            <div key={i} className="flex flex-col items-center w-1/7">
              <div className="relative flex-1 w-12">
                <div
                  className="absolute bottom-0 w-4 bg-blue-500 rounded-t mx-auto left-0 right-0"
                  style={{ height: `${(data.chats / maxChats) * 100}%` }}
                />
                <div
                  className="absolute bottom-0 w-4 bg-green-500 rounded-full mx-auto left-4"
                  style={{ bottom: `${data.successRate}%`, height: '4px' }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600">{data.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}