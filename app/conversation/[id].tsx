import { useState, useCallback, useRef } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";
import { Avatar } from "@/components/ui/Avatar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ChannelBadge } from "@/components/shared/ChannelBadge";
import { MessageBubble } from "@/components/conversation/MessageBubble";
import { ReplyInput } from "@/components/conversation/ReplyInput";
import { TemplatePicker } from "@/components/conversation/TemplatePicker";
import { useConversation } from "@/hooks/useConversations";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import type { Message, ReplyTemplate } from "@/types/message";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [templatePickerVisible, setTemplatePickerVisible] = useState(false);
  const [pendingReply, setPendingReply] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const { data: conversation, isLoading: convLoading } = useConversation(
    id ?? "",
  );
  const { data: messages, isLoading: msgsLoading } = useMessages(id ?? "");
  const sendMutation = useSendMessage(id ?? "");

  const handleSend = useCallback(
    (text: string) => {
      sendMutation.mutate(text);
    },
    [sendMutation],
  );

  const handleTemplateSelect = useCallback(
    (template: ReplyTemplate) => {
      setTemplatePickerVisible(false);
      // Send template content directly
      sendMutation.mutate(template.content);
    },
    [sendMutation],
  );

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => <MessageBubble message={item} />,
    [],
  );

  if (convLoading || msgsLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark">
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!conversation) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark items-center justify-center">
        <Text className="text-gray-500">Conversation not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <Pressable onPress={() => router.back()} hitSlop={8} className="mr-3">
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDark ? "#f9fafb" : "#111827"}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push(`/contact/${conversation.contactId}`)}
          className="flex-row items-center flex-1"
        >
          <Avatar
            name={conversation.contactName}
            imageUrl={conversation.contactAvatarUrl}
            size="md"
          />
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <Text className="text-base font-semibold text-gray-900 dark:text-white">
                {conversation.contactName}
              </Text>
              <ChannelBadge channel={conversation.channel} size={14} />
            </View>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              {conversation.subject}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerClassName="px-3 py-4"
        inverted={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: false })
        }
      />

      {/* Reply Input */}
      <ReplyInput
        onSend={handleSend}
        onTemplatePicker={() => setTemplatePickerVisible(true)}
        isSending={sendMutation.isPending}
      />

      {/* Template Picker Modal */}
      <TemplatePicker
        visible={templatePickerVisible}
        onClose={() => setTemplatePickerVisible(false)}
        onSelect={handleTemplateSelect}
      />
    </SafeAreaView>
  );
}
