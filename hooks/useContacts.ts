import { useQuery } from "@tanstack/react-query";
import {
  getContacts,
  getContact,
  searchContacts,
} from "@/services/contacts.service";

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContact(id),
    enabled: !!id,
  });
}

export function useSearchContacts(query: string) {
  return useQuery({
    queryKey: ["contacts", "search", query],
    queryFn: () => searchContacts(query),
    enabled: query.length > 0,
  });
}
