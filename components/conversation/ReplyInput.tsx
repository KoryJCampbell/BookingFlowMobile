import { useState } from "react";
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useHaptics } from "@/hooks/useHaptics";

interface ReplyInputProps {
  onSend: (text: string) => void;
  onTemplatePicker: () => void;
  isSending?: boolean;
}

export function ReplyInput({
  onSend,
  onTemplatePicker,
  isSending,
}: ReplyInputProps) {
  const [text, setText] = useState("");
  const haptics = useHaptics();

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    haptics.light();
    onSend(trimmed);
    setText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View className="flex-row items-end px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark">
        {/* Template picker */}
        <Pressable
          onPress={onTemplatePicker}
          className="p-2 mr-1"
          hitSlop={8}
        >
          <Ionicons name="document-text-outline" size={22} color="#9ca3af" />
        </Pressable>

        {/* Text input */}
        <View className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 max-h-32">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a reply..."
            placeholderTextColor="#9ca3af"
            className="text-base text-gray-900 dark:text-gray-100"
            multiline
            maxLength={2000}
          />
        </View>

        {/* Send button */}
        <Pressable
          onPress={handleSend}
          disabled={!text.trim() || isSending}
          className="p-2 ml-1"
          hitSlop={8}
        >
          <Ionicons
            name="send"
            size={22}
            color={text.trim() ? "#4c6ef5" : "#9ca3af"}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// Allow setting text externally (for template insertion)
ReplyInput.displayName = "ReplyInput";
