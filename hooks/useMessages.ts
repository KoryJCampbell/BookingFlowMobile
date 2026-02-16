import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMessages,
  sendMessage,
  getTemplates,
} from "@/services/messages.service";

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendMessage(conversationId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
}
