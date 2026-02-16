import { View, Text } from "react-native";
import { Image } from "expo-image";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "w-8 h-8", text: "text-xs", imageSize: 32 },
  md: { container: "w-10 h-10", text: "text-sm", imageSize: 40 },
  lg: { container: "w-14 h-14", text: "text-lg", imageSize: 56 },
  xl: { container: "w-20 h-20", text: "text-2xl", imageSize: 80 },
};

const bgColors = [
  "bg-primary-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
}

export function Avatar({ name, imageUrl, size = "md", className }: AvatarProps) {
  const { container, text, imageSize } = sizeMap[size];

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: imageSize, height: imageSize, borderRadius: imageSize / 2 }}
        className={className}
      />
    );
  }

  return (
    <View
      className={cn(
        "rounded-full items-center justify-center",
        container,
        getColorForName(name),
        className,
      )}
    >
      <Text className={cn("font-bold text-white", text)}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
