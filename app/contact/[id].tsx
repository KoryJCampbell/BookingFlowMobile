import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useContact } from "@/hooks/useContacts";

const typeBadgeVariant: Record<string, "info" | "success" | "warning" | "danger" | "default"> = {
  artist: "info",
  venue: "success",
  agent: "warning",
  promoter: "danger",
  other: "default",
};

export default function ContactProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { data: contact, isLoading } = useContact(id ?? "");

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark">
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!contact) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark items-center justify-center">
        <Text className="text-gray-500">Contact not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons
            name="close"
            size={24}
            color={isDark ? "#f9fafb" : "#111827"}
          />
        </Pressable>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white ml-4">
          Contact
        </Text>
      </View>

      <ScrollView contentContainerClassName="pb-8">
        {/* Profile Header */}
        <View className="items-center pt-6 pb-4 px-4">
          <Avatar name={contact.name} imageUrl={contact.avatarUrl} size="xl" />
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {contact.name}
          </Text>
          <View className="flex-row items-center mt-2 gap-2">
            <Badge
              label={contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
              variant={typeBadgeVariant[contact.type] ?? "default"}
              size="md"
            />
            {contact.organization && (
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {contact.organization}
              </Text>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-center gap-4 px-4 mb-6">
          {contact.email && (
            <Pressable
              onPress={() => Linking.openURL(`mailto:${contact.email}`)}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center">
                <Ionicons name="mail-outline" size={22} color="#4c6ef5" />
              </View>
              <Text className="text-xs text-gray-500 mt-1">Email</Text>
            </Pressable>
          )}
          {contact.phone && (
            <Pressable
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                <Ionicons name="call-outline" size={22} color="#51cf66" />
              </View>
              <Text className="text-xs text-gray-500 mt-1">Call</Text>
            </Pressable>
          )}
          {contact.phone && (
            <Pressable
              onPress={() => Linking.openURL(`sms:${contact.phone}`)}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 items-center justify-center">
                <Ionicons name="chatbubble-outline" size={22} color="#ff922b" />
              </View>
              <Text className="text-xs text-gray-500 mt-1">Text</Text>
            </Pressable>
          )}
        </View>

        {/* Contact Info Card */}
        <Card className="mx-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Contact Info
          </Text>
          <View className="gap-3">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={16} color="#9ca3af" />
              <Text className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {contact.email}
              </Text>
            </View>
            {contact.phone && (
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={16} color="#9ca3af" />
                <Text className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {contact.phone}
                </Text>
              </View>
            )}
            <View className="flex-row items-center">
              <Ionicons name="chatbubbles-outline" size={16} color="#9ca3af" />
              <Text className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {contact.conversationCount} conversations
              </Text>
            </View>
          </View>
        </Card>

        {/* Tags */}
        {contact.tags.length > 0 && (
          <Card className="mx-4 mb-4">
            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Tags
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {contact.tags.map((tag) => (
                <Chip key={tag} label={tag} className="mr-2" />
              ))}
            </ScrollView>
          </Card>
        )}

        {/* Notes */}
        <Card className="mx-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Notes
          </Text>
          <Text className="text-sm text-gray-700 dark:text-gray-300 leading-5">
            {contact.notes || "No notes yet."}
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
