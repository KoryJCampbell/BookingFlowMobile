import { View, Text, Pressable, Modal, FlatList, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTemplates } from "@/hooks/useMessages";
import type { ReplyTemplate } from "@/types/message";
import { Badge } from "@/components/ui/Badge";

interface TemplatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (template: ReplyTemplate) => void;
}

const categoryLabels: Record<string, string> = {
  greeting: "Greeting",
  availability: "Availability",
  pricing: "Pricing",
  decline: "Decline",
  confirmation: "Confirmation",
  follow_up: "Follow Up",
};

export function TemplatePicker({
  visible,
  onClose,
  onSelect,
}: TemplatePickerProps) {
  const { data: templates } = useTemplates();

  const renderTemplate = ({ item }: { item: ReplyTemplate }) => (
    <Pressable
      onPress={() => onSelect(item)}
      className="px-4 py-3 active:bg-gray-50 dark:active:bg-gray-800"
    >
      <View className="flex-row items-center mb-1">
        <Text className="text-base font-semibold text-gray-900 dark:text-white flex-1">
          {item.title}
        </Text>
        <Badge label={categoryLabels[item.category] ?? item.category} size="sm" />
      </View>
      <Text
        numberOfLines={2}
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        {item.content}
      </Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white dark:bg-surface-dark">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Replies
          </Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={24} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Template List */}
        <FlatList
          data={templates}
          keyExtractor={(item) => item.id}
          renderItem={renderTemplate}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-gray-100 dark:bg-gray-800 ml-4" />
          )}
        />
      </View>
    </Modal>
  );
}
