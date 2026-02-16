import { View, Text, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator size="large" color="#4c6ef5" />
      {label && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {label}
        </Text>
      )}
    </View>
  );
}
