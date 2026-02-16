import type { PipelineItem, PipelineStage } from "@/types/pipeline";
import { mockPipelineItems } from "@/mocks/pipeline";
import { delay } from "@/lib/utils";

const SIMULATED_DELAY = 300;

export async function getPipelineItems(): Promise<PipelineItem[]> {
  await delay(SIMULATED_DELAY);
  return [...mockPipelineItems];
}

export async function getPipelineItemsByStage(
  stage: PipelineStage,
): Promise<PipelineItem[]> {
  await delay(SIMULATED_DELAY);
  return mockPipelineItems.filter((item) => item.stage === stage);
}

export async function movePipelineItem(
  id: string,
  newStage: PipelineStage,
): Promise<void> {
  await delay(SIMULATED_DELAY);
  const item = mockPipelineItems.find((i) => i.id === id);
  if (item) {
    item.stage = newStage;
    item.enteredStageAt = new Date().toISOString();
    item.daysInStage = 0;
  }
}
