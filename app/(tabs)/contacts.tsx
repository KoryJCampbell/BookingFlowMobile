import { useState, useMemo, useCallback } from "react";
import { View, Text, SectionList, Pressable } from "react-native";
import { router } from "expo-router";
import { SearchBar } from "@/components/ui/SearchBar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useContacts, useSearchContacts } from "@/hooks/useContacts";
import type { Contact } from "@/types/contact";

const typeBadgeVariant: Record<string, "info" | "success" | "warning" | "danger" | "default"> = {
  artist: "info",
  venue: "success",
  agent: "warning",
  promoter: "danger",
  other: "default",
};

interface Section {
  title: string;
  data: Contact[];
}

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: contacts, isLoading } = useContacts();
  const { data: searchResults } = useSearchContacts(searchQuery);

  const displayedContacts = searchQuery.length > 0 ? searchResults : contacts;

  const sections = useMemo<Section[]>(() => {
    if (!displayedContacts) return [];
    const grouped: Record<string, Contact[]> = {};
    for (const contact of displayedContacts) {
      const letter = contact.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(contact);
    }
    return Object.keys(grouped)
      .sort()
      .map((letter) => ({ title: letter, data: grouped[letter] }));
  }, [displayedContacts]);

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <Pressable
        onPress={() => router.push(`/contact/${item.id}`)}
        className="flex-row items-center px-4 py-3 active:bg-gray-50 dark:active:bg-gray-800"
      >
        <Avatar name={item.name} imageUrl={item.avatarUrl} size="md" />
        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className="text-base font-medium text-gray-900 dark:text-white">
              {item.name}
            </Text>
            <View className="ml-2">
              <Badge
                label={item.type}
                variant={typeBadgeVariant[item.type] ?? "default"}
              />
            </View>
          </View>
          {item.organization && (
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {item.organization}
            </Text>
          )}
        </View>
      </Pressable>
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => (
      <View className="px-4 py-1.5 bg-gray-50 dark:bg-gray-900">
        <Text className="text-sm font-bold text-gray-500 dark:text-gray-400">
          {section.title}
        </Text>
      </View>
    ),
    [],
  );

  if (isLoading) {
    return <LoadingSpinner label="Loading contacts..." />;
  }

  return (
    <View className="flex-1 bg-white dark:bg-surface-dark">
      <View className="px-4 pt-2 pb-2">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search contacts..."
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-100 dark:bg-gray-800 ml-16" />
        )}
        stickySectionHeadersEnabled
        ListEmptyComponent={
          <EmptyState
            icon="people-outline"
            title="No contacts"
            subtitle={
              searchQuery
                ? "Try a different search term"
                : "Your contact list is empty"
            }
          />
        }
      />
    </View>
  );
}
