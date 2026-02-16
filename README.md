<h1 align="center">
  <br>
  BookingFlow Mobile
  <br>
</h1>

<p align="center">
  <strong>Talent booking inbox on the go — React Native companion app for BookingFlow.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Expo-54-000020?style=flat&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/NativeWind-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5-433e38?style=flat" />
  <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat&logo=reactquery&logoColor=white" />
</p>

---

## Overview

BookingFlow Mobile is a standalone React Native app for talent bookers and artist managers. It mirrors the core features of the [BookingFlow web app](https://github.com/KoryJCampbell/bookingflow) — unified inbox, booking pipeline, contacts, and quick-reply templates — with native mobile gestures, haptic feedback, and biometric login. The data layer is fully swappable between mock services and a real API.

## Features

### Inbox
- Conversation list with multi-channel support (Email, SMS, Instagram, WhatsApp, Phone, In-App)
- Search and filter: All / Bookings / Unread
- Swipe-to-archive and swipe-to-snooze gestures
- Unread indicators with badge counts
- Pull-to-refresh

### Conversation Thread
- Message bubbles with inbound/outbound styling
- Reply input with send button
- Template picker modal with 8 pre-built quick replies
- Channel and timestamp metadata

### Booking Pipeline
- 5 stages: **New → Responded → Negotiating → Booked → Declined**
- Filter by stage with dynamic counts
- Pipeline cards showing contact, event date, venue, and estimated booking value
- Color-coded stage indicators

### Contacts
- Alphabetically sorted section list
- Contact types: Artist, Venue, Agent, Promoter
- Search by name, email, or organization
- Detail modal with full info, tags, notes, and conversation history

### Settings
- Dark mode toggle
- Push notifications toggle
- Biometric login (Face ID / Touch ID)
- Haptic feedback toggle

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Native 0.81, Expo SDK 54, React 19 |
| **Routing** | Expo Router 6 (file-based) |
| **Styling** | NativeWind v4 + Tailwind CSS v3.4 |
| **State** | Zustand v5 (client), TanStack Query v5 (server) |
| **Gestures** | React Native Gesture Handler |
| **Animations** | React Native Reanimated v4 |
| **Auth** | Expo Secure Store + Expo Local Authentication (biometrics) |
| **Notifications** | Expo Notifications |
| **Icons** | @expo/vector-icons (Ionicons) |
| **Language** | TypeScript (strict) |

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Inbox
│   │   ├── pipeline.tsx       # Booking pipeline
│   │   ├── calendar.tsx       # Calendar (planned)
│   │   ├── contacts.tsx       # Contact directory
│   │   └── settings.tsx       # Preferences
│   ├── conversation/[id].tsx  # Message thread
│   ├── contact/[id].tsx       # Contact detail (modal)
│   └── login.tsx              # Login screen
├── components/
│   ├── conversation/          # MessageBubble, ReplyInput, TemplatePicker
│   ├── inbox/                 # ConversationRow, FilterChips, SwipeableRow
│   ├── pipeline/              # PipelineCard
│   ├── shared/                # ChannelBadge, StatusBadge, TimeAgo
│   └── ui/                    # Avatar, Badge, Button, Card, Chip, Input, etc.
├── hooks/                     # TanStack Query hooks for all entities
├── services/                  # Data layer (mock, swappable to real API)
├── stores/                    # Zustand: auth, inbox, pipeline, settings
├── mocks/                     # 12 conversations, 12 contacts, 12 pipeline items
├── types/                     # TypeScript interfaces
├── constants/                 # Pipeline stages, colors
└── lib/                       # Query client, utilities
```

## Mock Data

The app ships with a full mock data layer that simulates realistic talent booking scenarios:

- **12 conversations** across all channels (Luna Park, DJ Phantom, Jasmine Rivera, etc.)
- **12 contacts** spanning Artists, Venues, Agents, and Promoters
- **12 pipeline items** across all 5 stages with booking values ($1.5K–$50K)
- **8 reply templates** (greeting, availability, pricing, decline, confirmation, follow-up)

All mock services include a 300ms simulated network delay. Swap to a real API by replacing the service files — no component changes needed.

## Getting Started

### Prerequisites

- Node.js 20+
- Expo CLI (`npx expo`)
- iOS Simulator (Xcode) or Android Emulator

### Setup

```bash
git clone https://github.com/KoryJCampbell/BookingFlowMobile.git
cd BookingFlowMobile
npm install

# Start the Expo dev server
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

### Scripts

```bash
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser
```

### Login

Any email/password combination works with the mock auth service. The default user is "Kory Campbell".

## Color Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| **Primary** | `#4c6ef5` | `#748ffc` | Buttons, links, active states |
| **Surface** | `#ffffff` | `#1a1a2e` | Backgrounds |
| **New** | `#4dabf7` | — | Pipeline: new inquiries |
| **Responded** | `#ffd43b` | — | Pipeline: responded |
| **Negotiating** | `#ff922b` | — | Pipeline: in negotiation |
| **Booked** | `#51cf66` | — | Pipeline: confirmed bookings |
| **Declined** | `#ff6b6b` | — | Pipeline: declined |

## Roadmap

- [x] Multi-channel inbox with search and filters
- [x] Swipe gestures (archive, snooze)
- [x] Booking pipeline with stage filtering
- [x] Contact directory with detail modals
- [x] Quick-reply templates
- [x] Dark mode
- [x] Biometric login and haptic feedback
- [x] Complete mock data layer
- [ ] Real API integration (BookingFlow backend)
- [ ] Push notification handling
- [ ] Calendar integration (Google Calendar / Apple Calendar)
- [ ] Offline mode with local persistence
- [ ] Stage drag-and-drop on pipeline

## Related

- [BookingFlow](https://github.com/KoryJCampbell/bookingflow) — Web app (Next.js)

---

<p align="center">
  Built by <a href="https://github.com/KoryJCampbell">Kory J. Campbell</a>
</p>
