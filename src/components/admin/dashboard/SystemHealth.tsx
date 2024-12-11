import React from 'react';
import { Activity, Server, Clock, Database } from 'lucide-react';
import { Card } from '../../shared/Card';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const metrics: SystemMetric[] = [
  {
    name: 'CPU Usage',
    value: 45,
    unit: '%',
    status: 'healthy',
    icon: <Server className="h-5 w-5" />,
  },
  {
    name: 'Memory',
    value: 72,
    unit: '%',
    status: 'warning',
    icon: <Database className="h-5 w-5" />,
  },
  {
    name: 'API Latency',
    value: 120,
    unit: 'ms',
    status: 'healthy',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: 'Error Rate',
    value: 0.5,
    unit: '%',
    status: 'healthy',
    icon: <Activity className="h-5 w-5" />,
  },
];

export function SystemHealth() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">System Health</h2>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                {metric.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{metric.name}</div>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium
              ${metric.status === 'healthy' ? 'bg-green-100 text-green-800' :
                metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
              {metric.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}