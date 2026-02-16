import { Text } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface TimeAgoProps {
  date: string;
  className?: string;
}

export function TimeAgo({ date, className }: TimeAgoProps) {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: false });

  // Shorten common patterns
  const short = timeAgo
    .replace("less than a minute", "now")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace("about ", "");

  return (
    <Text className={cn("text-xs text-gray-400 dark:text-gray-500", className)}>
      {short}
    </Text>
  );
}
