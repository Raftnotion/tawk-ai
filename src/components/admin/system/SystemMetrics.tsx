import React from 'react';
import { Cpu, Server, Clock, Activity } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: 'good' | 'warning' | 'critical';
}

const mockMetrics: Metric[] = [
  {
    name: 'CPU Usage',
    value: 45,
    unit: '%',
    icon: <Cpu className="h-5 w-5" />,
    status: 'good',
  },
  {
    name: 'Memory Usage',
    value: 72,
    unit: '%',
    icon: <Server className="h-5 w-5" />,
    status: 'warning',
  },
  {
    name: 'API Latency',
    value: 120,
    unit: 'ms',
    icon: <Clock className="h-5 w-5" />,
    status: 'good',
  },
  {
    name: 'Error Rate',
    value: 0.5,
    unit: '%',
    icon: <Activity className="h-5 w-5" />,
    status: 'good',
  },
];

export function SystemMetrics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">System Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <div key={metric.name} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {metric.icon}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${metric.status === 'good' ? 'bg-green-100 text-green-800' :
                  metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {metric.status}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm text-gray-500">{metric.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}