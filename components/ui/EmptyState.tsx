import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <Ionicons name={icon} size={64} color="#9ca3af" />
      <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4 text-center">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-sm text-gray-400 dark:text-gray-500 mt-2 text-center">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
