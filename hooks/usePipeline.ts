import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPipelineItems,
  movePipelineItem,
} from "@/services/pipeline.service";
import type { PipelineStage } from "@/types/pipeline";

export function usePipeline() {
  return useQuery({
    queryKey: ["pipeline"],
    queryFn: getPipelineItems,
  });
}

export function useMovePipelineItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: PipelineStage }) =>
      movePipelineItem(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipeline"] });
    },
  });
}
