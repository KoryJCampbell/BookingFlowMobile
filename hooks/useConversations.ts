import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConversations,
  getConversation,
  archiveConversation,
  snoozeConversation,
  markAsRead,
  searchConversations,
  type InboxFilter,
} from "@/services/conversations.service";

export function useConversations(filter: InboxFilter) {
  return useQuery({
    queryKey: ["conversations", filter],
    queryFn: () => getConversations(filter),
  });
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: () => getConversation(id),
    enabled: !!id,
  });
}

export function useSearchConversations(query: string) {
  return useQuery({
    queryKey: ["conversations", "search", query],
    queryFn: () => searchConversations(query),
    enabled: query.length > 0,
  });
}

export function useArchiveConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: archiveConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useSnoozeConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, until }: { id: string; until: string }) =>
      snoozeConversation(id, until),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
