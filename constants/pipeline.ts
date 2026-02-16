import type { PipelineStageDefinition } from "@/types/pipeline";

export const PIPELINE_STAGES: PipelineStageDefinition[] = [
  { key: "new", label: "New", color: "#4dabf7", icon: "sparkles-outline" },
  {
    key: "responded",
    label: "Responded",
    color: "#ffd43b",
    icon: "chatbubble-outline",
  },
  {
    key: "negotiating",
    label: "Negotiating",
    color: "#ff922b",
    icon: "swap-horizontal-outline",
  },
  {
    key: "booked",
    label: "Booked",
    color: "#51cf66",
    icon: "checkmark-circle-outline",
  },
  {
    key: "declined",
    label: "Declined",
    color: "#ff6b6b",
    icon: "close-circle-outline",
  },
];
