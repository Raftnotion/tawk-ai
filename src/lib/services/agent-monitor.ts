import { EventEmitter } from 'events';
import type { AIAgent } from '../../types';

interface AgentMetrics {
  totalChats: number;
  activeChats: number;
  averageResponseTime: number;
  successRate: number;
}

export class AgentMonitor extends EventEmitter {
  private metrics: Map<string, AgentMetrics> = new Map();
  private static instance: AgentMonitor;

  private constructor() {
    super();
  }

  static getInstance(): AgentMonitor {
    if (!AgentMonitor.instance) {
      AgentMonitor.instance = new AgentMonitor();
    }
    return AgentMonitor.instance;
  }

  updateMetrics(agentId: string, updates: Partial<AgentMetrics>): void {
    const current = this.metrics.get(agentId) || {
      totalChats: 0,
      activeChats: 0,
      averageResponseTime: 0,
      successRate: 0,
    };

    const updated = { ...current, ...updates };
    this.metrics.set(agentId, updated);
    this.emit('metrics-updated', { agentId, metrics: updated });
  }

  getMetrics(agentId: string): AgentMetrics | undefined {
    return this.metrics.get(agentId);
  }

  startMonitoring(agent: AIAgent): void {
    // Initialize metrics for the agent
    this.metrics.set(agent.id, {
      totalChats: 0,
      activeChats: 0,
      averageResponseTime: 0,
      successRate: 0,
    });

    // Set up real-time monitoring
    this.emit('agent-started', agent);
  }

  stopMonitoring(agentId: string): void {
    this.metrics.delete(agentId);
    this.emit('agent-stopped', agentId);
  }
}