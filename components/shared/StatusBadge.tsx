import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  daysInStage: number;
  className?: string;
}

export function StatusBadge({ daysInStage, className }: StatusBadgeProps) {
  const label =
    daysInStage === 0
      ? "Today"
      : daysInStage === 1
        ? "1 day"
        : `${daysInStage} days`;

  const variant =
    daysInStage <= 1
      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
      : daysInStage <= 3
        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";

  return (
    <View className={cn("px-2 py-0.5 rounded-full", variant, className)}>
      <Text className={cn("text-xs font-medium", variant)}>{label}</Text>
    </View>
  );
}
