import { create } from "zustand";
import type { PipelineStage } from "@/types/pipeline";

interface PipelineStore {
  activeStage: PipelineStage | "all";
  setActiveStage: (stage: PipelineStage | "all") => void;
}

export const usePipelineStore = create<PipelineStore>((set) => ({
  activeStage: "all",
  setActiveStage: (stage) => set({ activeStage: stage }),
}));
