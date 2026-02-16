import { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useHaptics } from "@/hooks/useHaptics";

interface SwipeableRowProps {
  children: React.ReactNode;
  onArchive: () => void;
  onSnooze: () => void;
}

function RightActions(
  _prog: SharedValue<number>,
  drag: SharedValue<number>,
  onArchive: () => void,
) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + 80 }],
  }));

  return (
    <Reanimated.View style={animatedStyle}>
      <Pressable
        onPress={onArchive}
        className="bg-red-500 w-20 h-full items-center justify-center"
      >
        <Ionicons name="archive-outline" size={22} color="#fff" />
        <Text className="text-xs text-white mt-1">Archive</Text>
      </Pressable>
    </Reanimated.View>
  );
}

function LeftActions(
  _prog: SharedValue<number>,
  drag: SharedValue<number>,
  onSnooze: () => void,
) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value - 80 }],
  }));

  return (
    <Reanimated.View style={animatedStyle}>
      <Pressable
        onPress={onSnooze}
        className="bg-amber-500 w-20 h-full items-center justify-center"
      >
        <Ionicons name="time-outline" size={22} color="#fff" />
        <Text className="text-xs text-white mt-1">Snooze</Text>
      </Pressable>
    </Reanimated.View>
  );
}

export function SwipeableRow({
  children,
  onArchive,
  onSnooze,
}: SwipeableRowProps) {
  const swipeableRef = useRef<any>(null);
  const haptics = useHaptics();

  const handleArchive = () => {
    haptics.medium();
    onArchive();
    swipeableRef.current?.close();
  };

  const handleSnooze = () => {
    haptics.light();
    onSnooze();
    swipeableRef.current?.close();
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      leftThreshold={40}
      renderRightActions={(prog, drag) =>
        RightActions(prog, drag, handleArchive)
      }
      renderLeftActions={(prog, drag) =>
        LeftActions(prog, drag, handleSnooze)
      }
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="bg-white dark:bg-surface-dark">{children}</View>
    </ReanimatedSwipeable>
  );
}
