import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../index';
import type { KnowledgeBase } from '../../types';

export function useKnowledgeBases() {
  return useQuery({
    queryKey: ['knowledgeBases'],
    queryFn: async () => {
      const { data } = await api.get<KnowledgeBase[]>('/knowledge-bases');
      return data;
    },
  });
}

export function useKnowledgeBase(id: string) {
  return useQuery({
    queryKey: ['knowledgeBase', id],
    queryFn: async () => {
      const { data } = await api.get<KnowledgeBase>(`/knowledge-bases/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateKnowledgeBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (knowledgeBase: Partial<KnowledgeBase>) => {
      const { data } = await api.post<KnowledgeBase>('/knowledge-bases', knowledgeBase);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeBases'] });
    },
  });
}

export function useUpdateKnowledgeBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<KnowledgeBase> & { id: string }) => {
      const { data } = await api.put<KnowledgeBase>(`/knowledge-bases/${id}`, updates);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeBases'] });
      queryClient.invalidateQueries({ queryKey: ['knowledgeBase', data.id] });
    },
  });
}