import { Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
}

export function Chip({ label, selected = false, onPress, className }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "px-3.5 py-1.5 rounded-full mr-2",
        selected
          ? "bg-primary-600"
          : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        className,
      )}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          selected ? "text-white" : "text-gray-600 dark:text-gray-400",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
