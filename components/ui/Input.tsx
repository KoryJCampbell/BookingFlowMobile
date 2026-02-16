import { View, Text, TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName,
  className,
  ...props
}: InputProps) {
  return (
    <View className={cn("w-full", containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          "w-full px-4 py-3 rounded-xl text-base",
          "bg-muted-light dark:bg-muted-dark",
          "text-gray-900 dark:text-gray-100",
          "border",
          error
            ? "border-red-500"
            : "border-gray-200 dark:border-gray-700 focus:border-primary-500",
          className,
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && (
        <Text className="text-sm text-red-500 mt-1">{error}</Text>
      )}
    </View>
  );
}
