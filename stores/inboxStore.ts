import { create } from "zustand";
import type { InboxFilter } from "@/services/conversations.service";

interface InboxStore {
  activeFilter: InboxFilter;
  searchQuery: string;
  setActiveFilter: (filter: InboxFilter) => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useInboxStore = create<InboxStore>((set) => ({
  activeFilter: "all",
  searchQuery: "",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: "" }),
}));
