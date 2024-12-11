```typescript
import type { UsageMetrics } from './types';

export class UsageTracker {
  private static instance: UsageTracker;
  private usageData: Map<string, UsageMetrics> = new Map();

  private constructor() {}

  static getInstance(): UsageTracker {
    if (!UsageTracker.instance) {
      UsageTracker.instance = new UsageTracker();
    }
    return UsageTracker.instance;
  }

  async trackMessage(userId: string): Promise<void> {
    const usage = this.getOrCreateUsage(userId);
    usage.messages++;
    await this.updateUsage(userId, usage);
  }

  async trackAgent(userId: string): Promise<void> {
    const usage = this.getOrCreateUsage(userId);
    usage.agents++;
    await this.updateUsage(userId, usage);
  }

  async trackKnowledgeBase(userId: string): Promise<void> {
    const usage = this.getOrCreateUsage(userId);
    usage.knowledgeBases++;
    await this.updateUsage(userId, usage);
  }

  async getCurrentUsage(userId: string): Promise<UsageMetrics> {
    return this.getOrCreateUsage(userId);
  }

  private getOrCreateUsage(userId: string): UsageMetrics {
    const existing = this.usageData.get(userId);
    if (existing) return { ...existing };

    const initial: UsageMetrics = {
      messages: 0,
      agents: 0,
      knowledgeBases: 0,
    };
    this.usageData.set(userId, initial);
    return { ...initial };
  }

  private async updateUsage(userId: string, usage: UsageMetrics): Promise<void> {
    this.usageData.set(userId, usage);
    // TODO: Persist usage data to database
  }
}
```