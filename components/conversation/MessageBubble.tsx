import { View, Text } from "react-native";
import { ChannelBadge } from "@/components/shared/ChannelBadge";
import type { Message } from "@/types/message";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === "outbound";

  return (
    <View
      className={cn(
        "max-w-[80%] mb-2 px-1",
        isOutbound ? "self-end" : "self-start",
      )}
    >
      {/* Sender name for inbound */}
      {!isOutbound && (
        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1">
          {message.senderName}
        </Text>
      )}

      <View
        className={cn(
          "rounded-2xl px-4 py-2.5",
          isOutbound
            ? "bg-primary-600 rounded-br-md"
            : "bg-gray-100 dark:bg-gray-800 rounded-bl-md",
        )}
      >
        <Text
          className={cn(
            "text-base leading-6",
            isOutbound
              ? "text-white"
              : "text-gray-900 dark:text-gray-100",
          )}
        >
          {message.content}
        </Text>
      </View>

      {/* Timestamp + channel */}
      <View
        className={cn(
          "flex-row items-center mt-1 gap-1",
          isOutbound ? "justify-end mr-1" : "ml-1",
        )}
      >
        <Text className="text-xs text-gray-400 dark:text-gray-500">
          {format(new Date(message.createdAt), "h:mm a")}
        </Text>
        <ChannelBadge channel={message.channel} size={10} />
      </View>
    </View>
  );
}
