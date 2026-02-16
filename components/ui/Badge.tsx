import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  default: "bg-gray-200 dark:bg-gray-700",
  success: "bg-green-100 dark:bg-green-900",
  warning: "bg-yellow-100 dark:bg-yellow-900",
  danger: "bg-red-100 dark:bg-red-900",
  info: "bg-blue-100 dark:bg-blue-900",
};

const variantTextClasses = {
  default: "text-gray-700 dark:text-gray-300",
  success: "text-green-700 dark:text-green-300",
  warning: "text-yellow-700 dark:text-yellow-300",
  danger: "text-red-700 dark:text-red-300",
  info: "text-blue-700 dark:text-blue-300",
};

export function Badge({
  label,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <View
      className={cn(
        "rounded-full self-start",
        size === "sm" ? "px-2 py-0.5" : "px-3 py-1",
        variantClasses[variant],
        className,
      )}
    >
      <Text
        className={cn(
          "font-medium",
          size === "sm" ? "text-xs" : "text-sm",
          variantTextClasses[variant],
        )}
      >
        {label}
      </Text>
    </View>
  );
}
