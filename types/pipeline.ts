export type PipelineStage =
  | "new"
  | "responded"
  | "negotiating"
  | "booked"
  | "declined";

export interface PipelineItem {
  id: string;
  conversationId: string;
  contactId: string;
  contactName: string;
  contactAvatarUrl: string | null;
  inquiryPreview: string;
  stage: PipelineStage;
  enteredStageAt: string;
  daysInStage: number;
  eventDate: string | null;
  venue: string | null;
  estimatedValue: number | null;
  createdAt: string;
}

export interface PipelineStageDefinition {
  key: PipelineStage;
  label: string;
  color: string;
  icon: string;
}
