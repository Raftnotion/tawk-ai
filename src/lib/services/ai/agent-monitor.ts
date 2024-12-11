import { EventEmitter } from 'events';

interface AgentMetrics {
  totalMessages: number;
  successfulResponses: number;
  failedResponses: number;
  averageResponseTime: number;
  lastUpdated: Date;
}

interface MetricUpdate {
  responseTime?: number;
  success?: boolean;
}

export class AgentMonitor extends EventEmitter {
  private static instance: AgentMonitor;
  private metrics: Map<string, AgentMetrics> = new Map();

  private constructor() {
    super();
  }

  static getInstance(): AgentMonitor {
    if (!AgentMonitor.instance) {
      AgentMonitor.instance = new AgentMonitor();
    }
    return AgentMonitor.instance;
  }

  updateMetrics(agentId: string, update: MetricUpdate): void {
    let metrics = this.metrics.get(agentId) || {
      totalMessages: 0,
      successfulResponses: 0,
      failedResponses: 0,
      averageResponseTime: 0,
      lastUpdated: new Date(),
    };

    metrics.totalMessages++;
    
    if (update.success !== undefined) {
      if (update.success) {
        metrics.successfulResponses++;
      } else {
        metrics.failedResponses++;
      }
    }

    if (update.responseTime !== undefined) {
      metrics.averageResponseTime = (
        metrics.averageResponseTime * (metrics.totalMessages - 1) +
        update.responseTime
      ) / metrics.totalMessages;
    }

    metrics.lastUpdated = new Date();
    this.metrics.set(agentId, metrics);

    this.emit('metrics-updated', { agentId, metrics });
  }

  getMetrics(agentId: string): AgentMetrics | undefined {
    return this.metrics.get(agentId);
  }

  getAllMetrics(): Map<string, AgentMetrics> {
    return new Map(this.metrics);
  }
}