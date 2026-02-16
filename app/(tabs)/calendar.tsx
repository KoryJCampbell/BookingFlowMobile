import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CalendarScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-surface-dark px-8">
      <Ionicons name="calendar-outline" size={64} color="#9ca3af" />
      <Text className="text-xl font-semibold text-gray-500 dark:text-gray-400 mt-4 text-center">
        Calendar Coming Soon
      </Text>
      <Text className="text-sm text-gray-400 dark:text-gray-500 mt-2 text-center leading-5">
        Calendar integration with Google Calendar and Apple Calendar is planned
        for a future release.
      </Text>
    </View>
  );
}
