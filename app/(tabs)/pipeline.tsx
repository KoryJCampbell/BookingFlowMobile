import { useMemo, useCallback } from "react";
import { View, Text, FlatList, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { PipelineCard } from "@/components/pipeline/PipelineCard";
import { usePipeline } from "@/hooks/usePipeline";
import { usePipelineStore } from "@/stores/pipelineStore";
import { useHaptics } from "@/hooks/useHaptics";
import { PIPELINE_STAGES } from "@/constants/pipeline";
import type { PipelineItem, PipelineStage } from "@/types/pipeline";
import { cn } from "@/lib/utils";

export default function PipelineScreen() {
  const { data: items, isLoading } = usePipeline();
  const { activeStage, setActiveStage } = usePipelineStore();
  const haptics = useHaptics();

  const stageCounts = useMemo(() => {
    if (!items) return {};
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.stage] = (counts[item.stage] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (activeStage === "all") return items;
    return items.filter((item) => item.stage === activeStage);
  }, [items, activeStage]);

  const handleStagePress = useCallback(
    (stage: PipelineStage | "all") => {
      haptics.light();
      setActiveStage(stage);
    },
    [haptics, setActiveStage],
  );

  const renderCard = useCallback(
    ({ item }: { item: PipelineItem }) => (
      <PipelineCard
        item={item}
        onPress={() => router.push(`/conversation/${item.conversationId}`)}
      />
    ),
    [],
  );

  if (isLoading) {
    return <LoadingSpinner label="Loading pipeline..." />;
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-surface-dark">
      {/* Stage Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-3 py-3"
        className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800"
      >
        {/* All tab */}
        <Pressable
          onPress={() => handleStagePress("all")}
          className={cn(
            "flex-row items-center px-3.5 py-2 rounded-full mr-2",
            activeStage === "all"
              ? "bg-gray-900 dark:bg-white"
              : "bg-gray-100 dark:bg-gray-800",
          )}
        >
          <Text
            className={cn(
              "text-sm font-medium",
              activeStage === "all"
                ? "text-white dark:text-gray-900"
                : "text-gray-600 dark:text-gray-400",
            )}
          >
            All
          </Text>
          <View className="ml-1.5 bg-white/20 dark:bg-gray-900/20 rounded-full px-1.5 py-0.5">
            <Text
              className={cn(
                "text-xs font-bold",
                activeStage === "all"
                  ? "text-white dark:text-gray-900"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              {items?.length ?? 0}
            </Text>
          </View>
        </Pressable>

        {PIPELINE_STAGES.map((stage) => (
          <Pressable
            key={stage.key}
            onPress={() => handleStagePress(stage.key)}
            className={cn(
              "flex-row items-center px-3.5 py-2 rounded-full mr-2",
              activeStage === stage.key
                ? "bg-gray-900 dark:bg-white"
                : "bg-gray-100 dark:bg-gray-800",
            )}
          >
            <View
              style={{ backgroundColor: stage.color }}
              className="w-2 h-2 rounded-full mr-1.5"
            />
            <Text
              className={cn(
                "text-sm font-medium",
                activeStage === stage.key
                  ? "text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              {stage.label}
            </Text>
            <View className="ml-1.5 bg-white/20 dark:bg-gray-900/20 rounded-full px-1.5 py-0.5">
              <Text
                className={cn(
                  "text-xs font-bold",
                  activeStage === stage.key
                    ? "text-white dark:text-gray-900"
                    : "text-gray-500 dark:text-gray-400",
                )}
              >
                {stageCounts[stage.key] ?? 0}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Pipeline Cards */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerClassName="pt-3 pb-4"
        ListEmptyComponent={
          <EmptyState
            icon="funnel-outline"
            title="No items"
            subtitle="No booking inquiries in this stage"
          />
        }
      />
    </View>
  );
}
