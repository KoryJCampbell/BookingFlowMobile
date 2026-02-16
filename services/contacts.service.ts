import type { Contact } from "@/types/contact";
import { mockContacts } from "@/mocks/contacts";
import { delay } from "@/lib/utils";

const SIMULATED_DELAY = 300;

export async function getContacts(): Promise<Contact[]> {
  await delay(SIMULATED_DELAY);
  return [...mockContacts].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getContact(id: string): Promise<Contact | null> {
  await delay(SIMULATED_DELAY);
  return mockContacts.find((c) => c.id === id) ?? null;
}

export async function searchContacts(query: string): Promise<Contact[]> {
  await delay(SIMULATED_DELAY);
  const lowerQuery = query.toLowerCase();
  return mockContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery) ||
      (c.organization?.toLowerCase().includes(lowerQuery) ?? false),
  );
}

export async function updateContactNotes(
  id: string,
  notes: string,
): Promise<void> {
  await delay(SIMULATED_DELAY);
  const contact = mockContacts.find((c) => c.id === id);
  if (contact) contact.notes = notes;
}
