import { ScrollView } from "react-native";
import { Chip } from "@/components/ui/Chip";
import type { InboxFilter } from "@/services/conversations.service";

const filters: { key: InboxFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "bookings", label: "Bookings" },
  { key: "unread", label: "Unread" },
];

interface FilterChipsProps {
  activeFilter: InboxFilter;
  onFilterChange: (filter: InboxFilter) => void;
}

export function FilterChips({
  activeFilter,
  onFilterChange,
}: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-2"
    >
      {filters.map((f) => (
        <Chip
          key={f.key}
          label={f.label}
          selected={activeFilter === f.key}
          onPress={() => onFilterChange(f.key)}
        />
      ))}
    </ScrollView>
  );
}
