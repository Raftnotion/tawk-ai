import React from 'react';
import { AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { formatDate } from '../../../lib/utils';

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning';
  message: string;
  service: string;
}

const mockLogs: ErrorLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: 'error',
    message: 'Failed to process chat message: Invalid response format',
    service: 'chat-processor',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: 'warning',
    message: 'High memory usage detected',
    service: 'system-monitor',
  },
];

export function ErrorLogs() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Error Logs</h2>
        <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {mockLogs.map((log) => (
          <div
            key={log.id}
            className={`p-4 rounded-lg
              ${log.level === 'error' ? 'bg-red-50' : 'bg-yellow-50'}`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className={`h-5 w-5 mt-0.5
                ${log.level === 'error' ? 'text-red-600' : 'text-yellow-600'}`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium
                    ${log.level === 'error' ? 'text-red-900' : 'text-yellow-900'}`}>
                    {log.service}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {formatDate(log.timestamp)}
                  </span>
                </div>
                <p className={`mt-1
                  ${log.level === 'error' ? 'text-red-700' : 'text-yellow-700'}`}>
                  {log.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}