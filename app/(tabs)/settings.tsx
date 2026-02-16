import { View, Text, Switch, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore } from "@/stores/settingsStore";

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  value: boolean;
  onToggle: () => void;
}

function SettingRow({ icon, iconColor, label, value, onToggle }: SettingRowProps) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center flex-1">
        <View className="w-8 h-8 rounded-lg items-center justify-center bg-gray-100 dark:bg-gray-700">
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
        <Text className="ml-3 text-base text-gray-900 dark:text-white">
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#d1d5db", true: "#4c6ef5" }}
        thumbColor="#fff"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user, logout } = useAuthStore();
  const {
    notificationsEnabled,
    biometricEnabled,
    hapticFeedbackEnabled,
    toggleNotifications,
    toggleBiometric,
    toggleHapticFeedback,
  } = useSettingsStore();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-surface-dark"
      contentContainerClassName="pb-8"
    >
      {/* Profile Card */}
      {user && (
        <Card className="mx-4 mt-4 mb-6">
          <View className="flex-row items-center">
            <Avatar name={user.name} size="lg" />
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </Text>
              <Text className="text-xs text-primary-600 dark:text-primary-400 mt-0.5 capitalize">
                {user.role.replace("_", " ")}
              </Text>
            </View>
          </View>
        </Card>
      )}

      {/* Appearance */}
      <Card className="mx-4 mb-4">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Appearance
        </Text>
        <SettingRow
          icon="moon-outline"
          iconColor="#748ffc"
          label="Dark Mode"
          value={isDark}
          onToggle={() => setColorScheme(isDark ? "light" : "dark")}
        />
      </Card>

      {/* Notifications */}
      <Card className="mx-4 mb-4">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Notifications
        </Text>
        <SettingRow
          icon="notifications-outline"
          iconColor="#ff922b"
          label="Push Notifications"
          value={notificationsEnabled}
          onToggle={toggleNotifications}
        />
      </Card>

      {/* Security */}
      <Card className="mx-4 mb-4">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Security
        </Text>
        <SettingRow
          icon="finger-print-outline"
          iconColor="#51cf66"
          label="Biometric Login"
          value={biometricEnabled}
          onToggle={toggleBiometric}
        />
      </Card>

      {/* Preferences */}
      <Card className="mx-4 mb-4">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Preferences
        </Text>
        <SettingRow
          icon="phone-portrait-outline"
          iconColor="#e1306c"
          label="Haptic Feedback"
          value={hapticFeedbackEnabled}
          onToggle={toggleHapticFeedback}
        />
      </Card>

      {/* Account */}
      <Card className="mx-4 mb-4">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Account
        </Text>
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center py-3"
        >
          <View className="w-8 h-8 rounded-lg items-center justify-center bg-red-100 dark:bg-red-900">
            <Ionicons name="log-out-outline" size={18} color="#ff6b6b" />
          </View>
          <Text className="ml-3 text-base text-red-500 font-medium">
            Sign Out
          </Text>
        </Pressable>
      </Card>

      {/* About */}
      <View className="items-center mt-4">
        <Text className="text-xs text-gray-400 dark:text-gray-600">
          BookingFlow Mobile v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
