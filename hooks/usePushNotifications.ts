import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { registerForPushNotificationsAsync } from "@/services/notifications.service";

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(setExpoPushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((_notification) => {
        // Could update badge count via inbox store
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data?.conversationId) {
          router.push(`/conversation/${data.conversationId}`);
        }
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return { expoPushToken };
}
