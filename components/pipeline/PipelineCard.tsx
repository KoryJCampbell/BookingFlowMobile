import { View, Text, Pressable } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { PIPELINE_STAGES } from "@/constants/pipeline";
import type { PipelineItem } from "@/types/pipeline";
import { format } from "date-fns";

interface PipelineCardProps {
  item: PipelineItem;
  onPress: () => void;
}

export function PipelineCard({ item, onPress }: PipelineCardProps) {
  const stageConfig = PIPELINE_STAGES.find((s) => s.key === item.stage);

  return (
    <Pressable
      onPress={onPress}
      className="mx-4 mb-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden active:opacity-90"
    >
      {/* Stage color bar */}
      <View
        style={{ backgroundColor: stageConfig?.color ?? "#4dabf7", height: 3 }}
      />

      <View className="p-4">
        {/* Contact info */}
        <View className="flex-row items-center mb-2">
          <Avatar
            name={item.contactName}
            imageUrl={item.contactAvatarUrl}
            size="sm"
          />
          <Text className="ml-2 text-base font-semibold text-gray-900 dark:text-white flex-1">
            {item.contactName}
          </Text>
          <StatusBadge daysInStage={item.daysInStage} />
        </View>

        {/* Inquiry preview */}
        <Text
          numberOfLines={2}
          className="text-sm text-gray-600 dark:text-gray-400 mb-3"
        >
          {item.inquiryPreview}
        </Text>

        {/* Details row */}
        <View className="flex-row items-center gap-4">
          {item.eventDate && (
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-400 dark:text-gray-500">
                {format(new Date(item.eventDate), "MMM d, yyyy")}
              </Text>
            </View>
          )}
          {item.venue && (
            <Text
              numberOfLines={1}
              className="text-xs text-gray-400 dark:text-gray-500 flex-1"
            >
              {item.venue}
            </Text>
          )}
          {item.estimatedValue != null && (
            <Text className="text-xs font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(item.estimatedValue)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
