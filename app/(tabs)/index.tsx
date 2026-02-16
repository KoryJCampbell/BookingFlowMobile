import { useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { router } from "expo-router";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FilterChips } from "@/components/inbox/FilterChips";
import { ConversationRow } from "@/components/inbox/ConversationRow";
import { SwipeableRow } from "@/components/inbox/SwipeableRow";
import {
  useConversations,
  useSearchConversations,
  useArchiveConversation,
  useSnoozeConversation,
  useMarkAsRead,
} from "@/hooks/useConversations";
import { useInboxStore } from "@/stores/inboxStore";
import { useQueryClient } from "@tanstack/react-query";
import type { Conversation } from "@/types/conversation";

export default function InboxScreen() {
  const queryClient = useQueryClient();
  const { activeFilter, searchQuery, setActiveFilter, setSearchQuery } =
    useInboxStore();
  const [refreshing, setRefreshing] = useState(false);

  const { data: conversations, isLoading } = useConversations(activeFilter);
  const { data: searchResults } = useSearchConversations(searchQuery);
  const archiveMutation = useArchiveConversation();
  const snoozeMutation = useSnoozeConversation();
  const markAsReadMutation = useMarkAsRead();

  const displayedConversations =
    searchQuery.length > 0 ? searchResults : conversations;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["conversations"] });
    setRefreshing(false);
  }, [queryClient]);

  const handleConversationPress = useCallback(
    (conversation: Conversation) => {
      if (!conversation.isRead) {
        markAsReadMutation.mutate(conversation.id);
      }
      router.push(`/conversation/${conversation.id}`);
    },
    [markAsReadMutation],
  );

  const handleArchive = useCallback(
    (id: string) => {
      archiveMutation.mutate(id);
    },
    [archiveMutation],
  );

  const handleSnooze = useCallback(
    (id: string) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      snoozeMutation.mutate({ id, until: tomorrow.toISOString() });
    },
    [snoozeMutation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Conversation }) => (
      <SwipeableRow
        onArchive={() => handleArchive(item.id)}
        onSnooze={() => handleSnooze(item.id)}
      >
        <ConversationRow
          conversation={item}
          onPress={() => handleConversationPress(item)}
        />
      </SwipeableRow>
    ),
    [handleArchive, handleSnooze, handleConversationPress],
  );

  if (isLoading) {
    return <LoadingSpinner label="Loading conversations..." />;
  }

  return (
    <View className="flex-1 bg-white dark:bg-surface-dark">
      {/* Search */}
      <View className="px-4 pt-2">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search conversations..."
        />
      </View>

      {/* Filters */}
      <FilterChips
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Separator */}
      <View className="h-px bg-gray-100 dark:bg-gray-800" />

      {/* Conversation List */}
      <FlatList
        data={displayedConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-100 dark:bg-gray-800 ml-16" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="mail-open-outline"
            title="No conversations"
            subtitle={
              searchQuery
                ? "Try a different search term"
                : "Your inbox is empty"
            }
          />
        }
      />
    </View>
  );
}
