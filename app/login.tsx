import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }
    setError("");

    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-surface-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-2xl bg-primary-600 items-center justify-center mb-4">
              <Ionicons name="mail" size={32} color="#fff" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              BookingFlow
            </Text>
            <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">
              Your unified booking inbox
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <View>
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9"
                hitSlop={8}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9ca3af"
                />
              </Pressable>
            </View>

            {error ? (
              <Text className="text-sm text-red-500 text-center">{error}</Text>
            ) : null}

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              size="lg"
              className="mt-2"
            />

            <Pressable className="py-2">
              <Text className="text-sm text-primary-600 dark:text-primary-400 text-center">
                Forgot password?
              </Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <Text className="mx-4 text-sm text-gray-400">or</Text>
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </View>

          {/* OAuth Placeholders */}
          <View className="gap-3">
            <Button
              title="Continue with Google"
              onPress={() => {}}
              variant="outline"
              disabled
            />
            <Button
              title="Continue with Apple"
              onPress={() => {}}
              variant="outline"
              disabled
            />
            <Text className="text-xs text-gray-400 text-center mt-1">
              OAuth coming soon
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
