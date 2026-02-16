import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Channel } from "@/types/conversation";

const channelConfig: Record<
  Channel,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  email: { icon: "mail-outline", color: "#4c6ef5" },
  sms: { icon: "chatbubble-outline", color: "#51cf66" },
  instagram: { icon: "logo-instagram", color: "#e1306c" },
  whatsapp: { icon: "logo-whatsapp", color: "#25d366" },
  phone: { icon: "call-outline", color: "#ff922b" },
  in_app: { icon: "apps-outline", color: "#748ffc" },
};

interface ChannelBadgeProps {
  channel: Channel;
  size?: number;
}

export function ChannelBadge({ channel, size = 14 }: ChannelBadgeProps) {
  const config = channelConfig[channel];
  return (
    <View className="ml-1">
      <Ionicons name={config.icon} size={size} color={config.color} />
    </View>
  );
}
