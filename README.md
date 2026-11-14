# 🎉 PartyVerse — React Starter

A colorful, confetti-themed dashboard built with **React 19 + TypeScript + Vite**.

## Requirements
- Node.js 20.19+ or 22.12+ (compatible with Vite 6; Node.js 22 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually **http://localhost:5173**).

## Other commands

```bash
npm run typecheck
npm run build
npm run preview
```

## What's included?
- “Let's Party!” hero with confetti and CSS balloons
- “You're hosting” and “You're attending” demo event sections
- Responsive event cards and event detail modal
- Create New Event form (birthday, baby shower, gender reveal, get-together, wedding, custom)
- Browser localStorage persistence for newly created events
- No backend required to try it out

## Project layout

```text
src/
  components/
    CreateEventModal.tsx
    EventCard.tsx
    EventDetailsModal.tsx
  data/
    events.ts
  App.tsx
  main.tsx
  styles.css
```

## What's next?
Authentication, invitations, RSVP links, doodled avatars, and real guest lists. Those are **not implemented** in this starter. The attending cards are demo data; new events you create are stored only in this browser. Clear the browser's localStorage key `partyverse-react-events-v1` to reset created events.
