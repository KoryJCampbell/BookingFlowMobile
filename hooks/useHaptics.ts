import * as Haptics from "expo-haptics";
import { useSettingsStore } from "@/stores/settingsStore";
import { useCallback } from "react";

export function useHaptics() {
  const enabled = useSettingsStore((s) => s.hapticFeedbackEnabled);

  const light = useCallback(() => {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [enabled]);

  const medium = useCallback(() => {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [enabled]);

  const heavy = useCallback(() => {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [enabled]);

  const success = useCallback(() => {
    if (enabled)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [enabled]);

  const warning = useCallback(() => {
    if (enabled)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, [enabled]);

  const error = useCallback(() => {
    if (enabled)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [enabled]);

  return { light, medium, heavy, success, warning, error };
}
