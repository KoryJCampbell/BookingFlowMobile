import { create } from "zustand";

interface SettingsStore {
  notificationsEnabled: boolean;
  biometricEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  toggleNotifications: () => void;
  toggleBiometric: () => void;
  toggleHapticFeedback: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  notificationsEnabled: true,
  biometricEnabled: false,
  hapticFeedbackEnabled: true,
  toggleNotifications: () =>
    set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
  toggleBiometric: () =>
    set((s) => ({ biometricEnabled: !s.biometricEnabled })),
  toggleHapticFeedback: () =>
    set((s) => ({ hapticFeedbackEnabled: !s.hapticFeedbackEnabled })),
}));
