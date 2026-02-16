import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useConversations } from "@/hooks/useConversations";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const { data: conversations } = useConversations("all");
  const unreadCount =
    conversations?.filter((c) => !c.isRead).length ?? undefined;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: isDark ? "#748ffc" : "#3b5bdb",
        tabBarInactiveTintColor: isDark ? "#6b7280" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
          borderTopColor: isDark ? "#2d2d44" : "#e5e7eb",
        },
        headerStyle: {
          backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
        },
        headerTintColor: isDark ? "#f9fafb" : "#111827",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
          tabBarBadge: unreadCount && unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tabs.Screen
        name="pipeline"
        options={{
          title: "Pipeline",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="funnel-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
