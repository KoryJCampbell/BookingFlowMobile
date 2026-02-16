import { useRef, useCallback } from "react";
import { View, TextInput, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    onChangeText("");
    inputRef.current?.blur();
  }, [onChangeText]);

  return (
    <View
      className={cn(
        "flex-row items-center px-3 py-2 rounded-xl",
        "bg-gray-100 dark:bg-gray-800",
        className,
      )}
    >
      <Ionicons name="search-outline" size={18} color="#9ca3af" />
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-2 text-base text-gray-900 dark:text-gray-100"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color="#9ca3af" />
        </Pressable>
      )}
    </View>
  );
}
