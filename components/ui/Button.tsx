import { Pressable, Text, ActivityIndicator } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-primary-600 active:bg-primary-700",
  secondary: "bg-muted-light dark:bg-muted-dark active:opacity-80",
  outline:
    "border border-gray-300 dark:border-gray-600 bg-transparent active:bg-gray-100 dark:active:bg-gray-800",
  ghost: "bg-transparent active:bg-gray-100 dark:active:bg-gray-800",
};

const variantTextClasses = {
  primary: "text-white",
  secondary: "text-gray-900 dark:text-gray-100",
  outline: "text-gray-900 dark:text-gray-100",
  ghost: "text-primary-600 dark:text-primary-400",
};

const sizeClasses = {
  sm: "px-3 py-1.5 rounded-lg",
  md: "px-4 py-2.5 rounded-xl",
  lg: "px-6 py-3.5 rounded-xl",
};

const sizeTextClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        "flex-row items-center justify-center",
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#fff" : "#4c6ef5"}
        />
      ) : (
        <Text
          className={cn(
            "font-semibold text-center",
            variantTextClasses[variant],
            sizeTextClasses[size],
          )}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
