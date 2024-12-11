import { useQuery } from '@tanstack/react-query';
import { api } from '../index';

interface AnalyticsData {
  totalChats: number;
  activeUsers: number;
  aiAgents: number;
  knowledgeBases: number;
  chatMetrics: {
    date: string;
    chats: number;
    successRate: number;
  }[];
}

export function useAnalytics(dateRange?: { start: Date; end: Date }) {
  return useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async () => {
      const params = dateRange ? {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      } : undefined;

      const { data } = await api.get<AnalyticsData>('/analytics', { params });
      return data;
    },
  });
}