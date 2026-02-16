import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-2xl p-4",
        "bg-white dark:bg-gray-800",
        "border border-gray-100 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}
