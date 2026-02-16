import { View, Text, Pressable } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { ChannelBadge } from "@/components/shared/ChannelBadge";
import { TimeAgo } from "@/components/shared/TimeAgo";
import type { Conversation } from "@/types/conversation";
import { cn } from "@/lib/utils";

interface ConversationRowProps {
  conversation: Conversation;
  onPress: () => void;
}

export function ConversationRow({
  conversation,
  onPress,
}: ConversationRowProps) {
  const { contactName, contactAvatarUrl, lastMessage, lastMessageAt, channel, isRead, unreadCount } =
    conversation;

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center px-4 py-3",
        "active:bg-gray-50 dark:active:bg-gray-800",
        !isRead && "bg-primary-50/50 dark:bg-primary-900/20",
      )}
    >
      {/* Unread indicator */}
      <View className="w-2.5 mr-2">
        {!isRead && <View className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
      </View>

      {/* Avatar */}
      <Avatar
        name={contactName}
        imageUrl={contactAvatarUrl}
        size="md"
      />

      {/* Content */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <Text
              numberOfLines={1}
              className={cn(
                "text-base flex-shrink",
                !isRead
                  ? "font-bold text-gray-900 dark:text-white"
                  : "font-medium text-gray-700 dark:text-gray-300",
              )}
            >
              {contactName}
            </Text>
            <ChannelBadge channel={channel} size={12} />
          </View>
          <TimeAgo date={lastMessageAt} />
        </View>

        <View className="flex-row items-center mt-0.5">
          <Text
            numberOfLines={1}
            className={cn(
              "flex-1 text-sm",
              !isRead
                ? "text-gray-700 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500",
            )}
          >
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <View className="ml-2 bg-primary-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
              <Text className="text-xs font-bold text-white">
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
